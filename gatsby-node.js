const config = require('./src/utils/siteConfig')
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const loadPosts = new Promise((resolve) => {
    graphql(`
      {
        allContentfulPortfolioPiece(
          sort: { fields: [publicationDate], order: DESC }
          limit: 10000
        ) {
          edges {
            node {
              slug
              publicationDate
            }
          }
        }
      }
    `).then(result => {
      const pieces = result.data.allContentfulPortfolioPiece.edges
      const { piecesPerFirstPage, piecesPerPage} = config
      const numPages = Math.ceil(
        pieces.slice(piecesPerFirstPage).length / piecesPerPage
      )

      // Create main home page
      createPage({
        path: `/`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          limit: piecesPerFirstPage,
          skip: 0,
          numPages: numPages + 1,
          currentPage: 1,
        },
      })

      // Create additional pagination on home page if needed
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/${i + 2}/`,
          component: path.resolve(`./src/templates/index.js`),
          context: {
            limit: piecesPerPage,
            skip: i * piecesPerPage + piecesPerFirstPage,
            numPages: numPages + 1,
            currentPage: i + 2,
          },
        })
      })

      // Create each individual piece
      pieces.forEach((edge, i) => {
        const prev = i === 0 ? null : pieces[i - 1].node
        const next = i === pieces.length - 1 ? null : pieces[i + 1].node
        createPage({
          path: `${edge.node.slug}/`,
          component: path.resolve(`./src/templates/piece.js`),
          context: {
            slug: edge.node.slug,
            prev,
            next,
          },
        })
      })
      resolve()
    })
  })

  const loadTags = new Promise((resolve) => {
    graphql(`
      {
        allContentfulTag {
          edges {
            node {
              slug
              piece: portfolio_piece {
                id
              }
            }
          }
        }
      }
    `).then(result => {
      const tags = result.data.allContentfulTag.edges
      const {piecesPerPage} = config

      // Create tag pages with pagination if needed
      tags.map(({ node }) => {
        const totalPieces = node.piece !== null ? node.piece.length : 0
        const numPages = Math.ceil(totalPieces / piecesPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path:
              i === 0 ? `/tag/${node.slug}/` : `/tag/${node.slug}/${i + 1}/`,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
              slug: node.slug,
              limit: piecesPerPage,
              skip: i * piecesPerPage,
              numPages: numPages,
              currentPage: i + 1,
            },
          })
        })
      })
      resolve()
    })
  })

  const loadPages = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      const pages = result.data.allContentfulPage.edges
      pages.map(({ node }) => {
        createPage({
          path: `${node.slug}/`,
          component: path.resolve(`./src/templates/page.js`),
          context: {
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })

  return Promise.all([loadPosts, loadTags, loadPages])
}
