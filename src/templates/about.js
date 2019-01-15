import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import { Layout, Container, PageTitle, PageBody, SEO } from '../components'

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
        <Img fluid={profilePicture.fluid} backgroundColor={'#eeeeee'} />
        <p>
          <em>Photo Credit &mdash; {profilePictureAttribution}</em>
        </p>
        <h2>Bio</h2>
        <PageBody body={bio.childMarkdownRemark.html} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($authorContentfulProfileId: String) {
    contentfulProfile(id: { eq: $authorContentfulProfileId }) {
      # fullName
      profilePicture {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
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
