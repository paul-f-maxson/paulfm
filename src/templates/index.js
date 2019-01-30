import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import * as faIcons from 'react-icons/fa'
import Helmet from 'react-helmet'
import {
  Layout,
  PageTitle,
  SectionTitle,
  Flex,
  Button,
  CardList,
  Card,
  Container,
  Pagination,
  SEO,
} from '../components'

import { portfolioIndexSchema } from '../schemaOrg'

import siteConfig from '../utils/siteConfig'

const WelcomeBody = styled.p`
  font: ${({ theme }) => theme.fonts.body};
  margin-top: 0.5em;
  line-height: 1.5em;
  strong {
    font-weight: 600;
  }
`

const Index = ({ data, pageContext }) => {
  const pieces = data.allContentfulPortfolioPiece.edges
  const { mainHero } = data
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
        return (
          <Fragment key={piece.id}>
            <Card {...config} />
          </Fragment>
        )
      })}
    </CardList>
  )

  const externalLinks = (
    <Flex row spaceBetweenKids="1rem">
      {iconLinks.map(({ name, iconName, linkUrl }) => {
        // HACK: Convert fa icon class names (like "free-code-camp") to react-icon library keys (like "FaFreeCodeCamp"). This may break if react-icons changes their name conversion pattern, and this whole section will probably need to be rewritten if a different icon library is implemented
        const camelIconName =
          'Fa' +
          iconName
            .replace(/-([a-z])/g, match => match[1].toUpperCase())
            .replace(/^[a-z]/, match => match[0].toUpperCase())

        const Icon = faIcons[camelIconName]

        return (
          <Fragment key={name}>
            <Button href={linkUrl} padding="0.7rem">
              <IconContext.Provider value={{ size: '3em', color: 'white' }}>
                <div>
                  {/* NOTE: This will crash the build with ~"cannot render undefined" if the name conversion above fails */}
                  {/* TODO: Implement an error boundary */}
                  <Icon title={name} />
                </div>
              </IconContext.Provider>
            </Button>
          </Fragment>
        )
      })}
    </Flex>
  )

  const seoConfig = {
    title: 'Portfolio Index',
    description: "The index of Paul Maxson's web development portfolio",
    pageURL: siteConfig.siteURL,
    imageURL: mainHero.ogimg.src,
    imageWidth: mainHero.ogimg.width,
    imageHeight: mainHero.ogimg.height,
    additionalSchemaOrgJSONLD: portfolioIndexSchema({
      pieces: pieces.map(({ node }) => ({
        title: node.title,
        slug: node.slug,
        imageURL: node.mainImage.ogimg.src,
        imageWidth: node.mainImage.ogimg.width,
        imageHeight: node.mainImage.ogimg.height,
        description: node.shortDescription,
        tagTitles: node.tags.map(({ title }) => title),
        wordCount: node.discussion.childMarkdownRemark.wordCount.words,
        timeToRead: node.discussion.childMarkdownRemark.timeToRead,
        body: node.discussion.childMarkdownRemark.rawMarkdownBody,
        publicationDateISO: node.publicationDateISO,
      })),
    }),
  }

  return (
    <Layout>
      <SEO {...seoConfig} />
      {isFirstPage ? (
        <>
          <Container>
            <Img {...mainHero} />
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
            <SectionTitle>Connect</SectionTitle>
            {externalLinks}
          </Container>
        </>
      ) : (
        <>
          <Helmet>
            <title>{`${siteConfig.siteTitle} - Page ${currentPage}`}</title>
          </Helmet>
          <Container>{cards}</Container>
        </>
      )}
      <Container>
        <Pagination context={pageContext} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query(
    $mainHeroContentfulAssetId: String!
    $authorContentfulProfileId: String!
    $skip: Int!
    $limit: Int!
  ) {
    mainHero: contentfulAsset(
      contentful_id: { eq: $mainHeroContentfulAssetId }
    ) {
      title
      fluid(maxWidth: 1800) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
      ogimg: resize(width: 1800) {
        src
        width
        height
      }
    }

    authorInfo: contentfulProfile(
      contentful_id: { eq: $authorContentfulProfileId }
    ) {
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
          slug
          shortDescription
          publicationDate(formatString: "MMMM DD, YYYY")
          publicationDateISO: publicationDate(formatString: "YYYY-MM-DD")
          repoLink
          pieceLink
          tags {
            title
            id
            slug
          }
          mainImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            ogimg: resize(width: 1800) {
              src
              width
              height
            }
          }
          discussion {
            childMarkdownRemark {
              timeToRead
              wordCount {
                words
              }
              rawMarkdownBody
              html
            }
          }
        }
      }
    }
  }
`

export default Index
