import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import {
  Layout,
  Container,
  TagList,
  SEO,
  CollectionLinks,
  PublishDate,
  PageBody,
  Hero,
  ContentLinks,
} from '../components'

import { portfolioPieceSchema } from '../schemaOrg'

const PieceTemplate = ({ data, pageContext }) => {
  const {
    title,
    slug,
    tags,
    discussion,
    publicationDate,
    publicationDateISO,
    pieceLink,
    repoLink,
    shortDescription,
    mainImage,
  } = data.contentfulPortfolioPiece
  const { prev: previous, next } = pageContext

  const seoConfig = {
    title: title,
    description: shortDescription,
    slug,
    imageURL: mainImage.ogimg.src,
    imageWidth: mainImage.ogimg.width,
    imageHeight: mainImage.ogimg.height,
    additionalSchemaOrgJSONLD: portfolioPieceSchema({
      title,
      slug,
      imageURL: mainImage.ogimg.src,
      imageWidth: mainImage.ogimg.width,
      imageHeight: mainImage.ogimg.height,
      description: shortDescription,
      tagTitles: tags.map(({ title }) => title),
      wordCount: discussion.childMarkdownRemark.wordCount.words,
      timeToRead: discussion.childMarkdownRemark.timeToRead,
      body: discussion.childMarkdownRemark.rawMarkdownBody,
      repoLink,
      pieceLink,
      publicationDateISO,
    }),
    additionalMetaTags: [
      <meta key="og-type-article" property="og:type" content="article" />,
    ],
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>

      <SEO {...seoConfig} />

      <Hero title={title} image={mainImage} height={'50vh'} />
      <Container>
        <ContentLinks pieceLink={pieceLink} repoLink={repoLink} />
      </Container>
      <Container>
        {tags && <TagList tags={tags} />}
        <PublishDate date={publicationDate} />

        <PageBody html={discussion.childMarkdownRemark.html} />
      </Container>
      <Container>
        <CollectionLinks
          previous={previous}
          next={next}
          collectionItemName={'Piece'}
        />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPortfolioPiece(slug: { eq: $slug }) {
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
`

export default PieceTemplate
