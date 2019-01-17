import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import {
  Layout,
  Container,
  PageTitle,
  SectionTitle,
  PageBody,
  // SEO,
} from '../components'

// TODO: Implement SEO

const AboutTemplate = ({ data }) => {
  const {
    profilePicture,
    profilePictureAttribution,
    bio,
  } = data.contentfulProfile

  return (
    <Layout>
      <Helmet>
        <title>{`About - ${config.siteTitle}`}</title>
      </Helmet>
      {/* <SEO></SEO> */}

      <Container>
        <PageTitle>About</PageTitle>
        {/* OPTIMIZE: Abstract to styled component */}
        <div style={{ maxWidth: 300, margin: '0 auto' }}>
          <Img
            fluid={profilePicture.fluid}
            backgroundColor={'#eeeeee'}
            alt={`${profilePicture.description}`}
            id="profile"
          />
          <label htmlFor="profile" style={{ "line-height": "2rem" }}>
            <em>Photo Credit &mdash; {profilePictureAttribution}</em>
          </label>
        </div>
      </Container>
      <Container>
        <SectionTitle>Bio</SectionTitle>
        <PageBody html={bio.childMarkdownRemark.html} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($authorContentfulProfileId: String) {
    contentfulProfile(id: { eq: $authorContentfulProfileId }) {
      # fullName
      profilePicture {
        fluid(maxWidth: 300) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        description
      }
      profilePictureAttribution
      bio {
        childMarkdownRemark {
          html
        }
      }
      # metaDescription
      iconLinks {
        name
        description
        iconName
        linkUrl
      }
    }
  }
`

export default AboutTemplate
