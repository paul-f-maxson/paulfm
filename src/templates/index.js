import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import * as faIcons from 'react-icons/fa'
import Helmet from 'react-helmet'
import {
  Layout,
  PageTitle,
  SectionTitle,
  ButtonBar,
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
  strong {
    font-weight: 600;
  }
`

const Index = ({ data, pageContext }) => {
  const pieces = data.allContentfulPortfolioPiece.edges
  const { shortBio, iconLinks } = data.authorInfo
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

  const externalLinks = // TODO: Group buttons closer together
    <ButtonBar>
      {iconLinks.map(({ name, iconName, linkUrl }) => {
        // HACK: Convert fa icon class names (like "free-code-camp") to react-icon library keys (like "FaFreeCodeCamp"). This may break if react-icons changes their name conversion pattern, and this whole section will probably need to be rewritten if a different icon library is implemented
        const camelIconName = 'Fa' + iconName
            .replace(/-([a-z])/g, match => match[1].toUpperCase())
            .replace(/^[a-z]/, match => match[0].toUpperCase())

        const Icon = faIcons[camelIconName]

        return <Fragment key={name}>
            <a href={linkUrl}>
              <IconContext.Provider value={{ size: '3em', color: 'white' }}>
                <div>
                  {/* NOTE: This will crash the build with ~"cannot render undefined" if the name conversion above fails */}
                  {/* TODO: Implement an error boundary */}
                  <Icon title={name} />
                </div>
              </IconContext.Provider>
            </a>
          </Fragment>
      })}
    </ButtonBar>

  return (
    <Layout>
      <SEO />
      {isFirstPage ? (
        <>
          <Container>
            <PageTitle>Welcome</PageTitle>
            <WelcomeBody
              dangerouslySetInnerHTML={{
                __html: shortBio.childMarkdownRemark.html,
              }}
            />
            <WelcomeBody>This website hosts his portfolio.</WelcomeBody>
          </Container>

          <Container>
            <SectionTitle>Portfolio Index</SectionTitle>
            {cards}
          </Container>
          <Container>
            <SectionTitle>Other Profiles</SectionTitle>
            {externalLinks}
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
  query($authorContentfulProfileId: String!, $skip: Int!, $limit: Int!) {
    authorInfo: contentfulProfile(id: { eq: $authorContentfulProfileId }) {
      # OPTIMIZE: fullName
      shortBio {
        childMarkdownRemark {
          html
        }
      }
      # OPTIMIZE: metaDescription
      iconLinks {
        name
        iconName
        linkUrl
      }
    }

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
