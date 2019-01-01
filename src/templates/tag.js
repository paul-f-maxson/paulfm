import React from 'react'
import { graphql } from 'gatsby'
import orderBy from 'lodash/orderBy'
import Helmet from 'react-helmet'
import moment from 'moment'
import config from '../utils/siteConfig'
import {
  Layout,
  Card,
  CardList,
  PageTitle,
  Pagination,
  Container,
} from '../components'

const TagTemplate = ({ data, pageContext }) => {
  const pieces = orderBy(
    data.contentfulTag.piece,
    // eslint-disable-next-line
    [object => new moment(object.publishDateISO)],
    ['desc']
  )

  const { title, slug } = data.contentfulTag
  const numberOfPosts = pieces.length
  const skip = pageContext.skip
  const limit = pageContext.limit
  const currentPage = pageContext.currentPage
  const isFirstPage = currentPage === 1

  const cards = (
    <CardList>
      {pieces.slice(skip, limit * currentPage).map(piece => {
        const config = {
          linkSlug: piece.slug,
          image: piece.mainImage,
          title: piece.title,
          date: piece.publishDate,
          body: piece.shortDescription,
        }
        return <Card key={piece.id} {...config} />
      })}
    </CardList>
  )
  return (
    <Layout>
      {isFirstPage ? (
        <Helmet>
          <title>{`Tag: ${title} - ${config.siteTitle}`}</title>
          <meta
            property="og:title"
            content={`Tag: ${title} - ${config.siteTitle}`}
          />
          <meta property="og:url" content={`${config.siteUrl}/tag/${slug}/`} />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`Tag: ${title} - Page ${currentPage} - ${
            config.siteTitle
          }`}</title>
          <meta
            property="og:title"
            content={`Tag: ${title} - Page ${currentPage} - ${
              config.siteTitle
            }`}
          />
          <meta property="og:url" content={`${config.siteUrl}/tag/${slug}/`} />
        </Helmet>
      )}

      <Container>
        <PageTitle small>
          {numberOfPosts} Posts Tagged: &ldquo;
          {title}
          &rdquo;
        </PageTitle>
        {cards}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      title
      id
      slug
      piece: portfolio_piece {
        id
        title
        slug
        publishDate: publicationDate(formatString: "MMMM DD, YYYY")
        publishDateISO: publicationDate(formatString: "YYYY-MM-DD")
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
`

export default TagTemplate
