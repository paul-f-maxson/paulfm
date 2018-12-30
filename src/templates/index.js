import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import {
  Layout,
  Welcome,
  CardList,
  Card,
  Container,
  Pagination,
  SEO,
} from '../components'
import config from '../utils/siteConfig'

const Index = ({ data, pageContext }) => {
  const pieces = data.allContentfulPortfolioPiece.edges
  const { currentPage } = pageContext
  const isFirstPage = currentPage === 1

  return (
    <Layout>
      <SEO />
      {!isFirstPage && (
        <Helmet>
          <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
        </Helmet>
      )}
      {isFirstPage ? (
        <>
          <Container>
            <Welcome />
          </Container>
          <Container>
            <CardList>
              {pieces.map(({ node: piece }) => (
                <Card key={piece.id} {...piece} />
              ))}
            </CardList>
          </Container>
        </>
      ) : (
        <Container>
          <CardList>
            {pieces.map(({ node: piece }) => (
              <Card key={piece.id} {...piece} />
            ))}
          </CardList>
        </Container>
      )}

      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPortfolioPiece(
      sort: { fields: [publicationDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publicationDate(formatString: "MMMM DD, YYYY")
          mainImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          discussion {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`

export default Index
