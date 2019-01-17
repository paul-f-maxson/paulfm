import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import {
  Layout,
  PageTitle,
  SectionTitle,
  CardList,
  Card,
  Container,
  Pagination,
  SEO,
} from '../components'
import config from '../utils/siteConfig'

const WelcomeBody = styled.p`
  margin-top: 0.5em;
  line-height: 1.5em;
`

const Index = ({ data, pageContext }) => {
  const pieces = data.allContentfulPortfolioPiece.edges
  const {fullName, shortBio, iconLinks} = data.authorInfo
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

  return <Layout>
      <SEO />
      {isFirstPage ? <>
          <Container>
            <PageTitle>Welcome</PageTitle>
            <WelcomeBody>{shortBio}</WelcomeBody>
            <WelcomeBody>This website hosts his portfolio.</WelcomeBody>
          </Container>
          <Container>
            <SectionTitle>Portfolio Index</SectionTitle>
            {cards}
          </Container>
        </> : <>
          <Helmet>
            <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
          </Helmet>
          <Container>{cards}</Container>
        </>}
      <Pagination context={pageContext} />
    </Layout>
}

export const query = graphql`
  query($authorContentfulProfileId: String!, $skip: Int!, $limit: Int!) {
    authorInfo: contentfulProfile(id: { eq: $authorContentfulProfileId }) {
      fullName
      shortBio
      # TODO: metaDescription
      iconLinks {
        name
        iconName
        linkUrl
      }
    }

    allContentfulPortfolioPiece(sort: { fields: [publicationDate], order: DESC }, limit: $limit, skip: $skip) {
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
