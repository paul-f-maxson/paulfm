import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import {
  Layout,
  PageTitle,
  SectionTitle,
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

  const cards = (
    <CardList>
      {pieces.map(({ node: piece }) => {
        const config = {
          linkSlug: piece.slug,
          image: piece.mainImage,
          title: piece.title,
          date: piece.publicationDate,
          body: piece.shortDescription,
        }
        return <Card key={piece.id} {...config} />
      })}
    </CardList>
  )

  return (
    <Layout>
      <SEO />
      {isFirstPage ? (
        <>
          <Container>
            <PageTitle>Welcome</PageTitle>
            <Welcome />
          </Container>
          <Container>
            <SectionTitle>Portfolio Index</SectionTitle>
            {cards}
          </Container>
        </>
      ) : (
        <>
          <Helmet>
            <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
          </Helmet>
          <Container>{cards}</Container>
        </>
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
          shortDescription
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
            }
          }
        }
      }
    }
  }
`

export default Index
