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

  const seoData = {
    title: title,
    metaDescription: shortDescription,
    heroImage: mainImage,
    publishDate: publicationDate,
    publishDateISO: publicationDateISO,
  }

  return <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} data={seoData} pieceSEO customTitle />

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
        <CollectionLinks previous={previous} next={next} collectionItemName={'Piece'} />
      </Container>
    </Layout>
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
          html
        }
      }
    }
  }
`

export default PieceTemplate
