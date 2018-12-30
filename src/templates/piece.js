import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import {
  Layout,
  Container,
  TagList,
  SEO,
} from '../components'

const PieceTemplate = ({ data }) => {
  const {
    title,
    slug,
    tags,
  } = data.contentfulPortfolioPiece
  const pieceNode = data.contentfulPiece

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} pieceNode={pieceNode} />

      

      <Container>
        {tags && <TagList tags={tags} />}
        
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPortfolioPiece(slug: { eq: $slug }) {
      title
      slug
    }
  }
`

export default PieceTemplate
