import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import { Layout, Container, PageTitle, PageBody, SEO } from '../components'

import { aboutSchema } from '../schemaOrg'

const AboutTemplate = ({ data }) => {
  const {
    fullName,
    profilePicture,
    profilePictureAttribution,
    metaDescription,
    bio,
    shortBio,
  } = data.contentfulProfile

  const seoConfig = {
    title: 'About',
    description: metaDescription,
    slug: 'about',
    imageURL: profilePicture.ogimg.src,
    imageWidth: profilePicture.ogimg.width,
    imageHeight: profilePicture.ogimg.height,
    additionalSchemaOrgJSONLD: aboutSchema({
      fullName,
      shortBio: shortBio.childMarkdownRemark.rawMarkdownBody,
      timeToRead: `P${bio.childMarkdownRemark.timeToRead}M`,
      imageUrl: profilePicture.ogimg.src,
      imageWidth: profilePicture.ogimg.width,
      imageHeight: profilePicture.ogimg.height,
      imageCaption: profilePictureAttribution,
      body: bio.childMarkdownRemark.rawMarkdownBody,
    }),
  }

  return (
    <Layout>
      <Helmet>
        <title>{`About - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO {...seoConfig} />

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
          <label htmlFor="profile" style={{ 'line-height': '2rem' }}>
            <em>Photo Credit &mdash; {profilePictureAttribution}</em>
          </label>
        </div>
      </Container>
      <Container>
        <PageBody html={bio.childMarkdownRemark.html} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($authorContentfulProfileId: String) {
    contentfulProfile(contentful_id: { eq: $authorContentfulProfileId }) {
      fullName
      shortBio {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      profilePicture {
        fluid(maxWidth: 300) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        description
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      profilePictureAttribution
      bio {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      metaDescription
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
