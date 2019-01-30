import React from 'react'
import Helmet from 'react-helmet'
import siteConfig from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import ContactForm from '../components/ContactForm'

import { contactSchema } from '../schemaOrg'

const SEO = () => (
  <Helmet>
    <meta name="description" content={'Contact Paul Maxson via email from this page'} />

    {/* Schema.org tags */}
    <script type="application/ld+json">
      {JSON.stringify(contactSchema())}
    </script>

    {/* OpenGraph tags */}
    <meta property="og:title" content={"Contact"} />

    <meta property="og:url" content={`${siteConfig.siteURL}/contact`} />

    <meta property="og:description" content={'Contact Paul Maxson via email from this page'} />
  </Helmet>
)

const Contact = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>{`Contact - ${siteConfig.siteTitle}`}</title>
      </Helmet>

      <SEO />

      <Container>
        <PageTitle>Contact</PageTitle>
        <ContactForm />
      </Container>
    </Layout>
  )
}

export default Contact
