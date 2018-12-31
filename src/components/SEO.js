import React, { Component } from 'react'
import Helmet from 'react-helmet'
import siteConfig from '../utils/siteConfig'

class SEO extends Component {
  render() {
    const {
      data,
      pagePath,
      postSEO,
      pageSEO,
      pieceSEO,
      customTitle,
    } = this.props
    let title
    let description
    let image
    let imgWidth
    let imgHeight
    let pageUrl

    // Set Default OpenGraph Parameters for Fallback
    title = siteConfig.siteTitle
    description = siteConfig.siteDescription
    image = siteConfig.siteUrl + siteConfig.shareImage
    imgWidth = siteConfig.shareImageWidth
    imgHeight = siteConfig.shareImageHeight
    pageUrl = siteConfig.siteUrl

    if (customTitle) {
      title = data.title
      pageUrl = siteConfig.siteUrl + '/' + pagePath + '/'
    }

    // Replace with Page Parameters if post or page
    if (postSEO || pageSEO || pieceSEO) {
      title = data.title
      description =
        data.metaDescription === null
          ? data.body.childMarkdownRemark.excerpt
          : data.metaDescription.internal
          ? data.metaDescription.internal.content
          : data.metaDescription

      pageUrl = siteConfig.siteUrl + '/' + pagePath + '/'
    }
    // Use Hero Image for OpenGraph
    if (postSEO) {
      image = 'https:' + data.heroImage.ogimg.src
      imgWidth = data.heroImage.ogimg.width
      imgHeight = data.heroImage.ogimg.height
    }

    // Default Website Schema
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteConfig.siteUrl,
        name: siteConfig.siteTitle,
        alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
      },
    ]

    // Blog Post Schema
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': siteConfig.siteUrl,
                name: siteConfig.siteTitle,
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': pageUrl,
                name: title,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: pageUrl,
          name: title,
          alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
            width: imgWidth,
            height: imgHeight,
          },
          author: {
            '@type': 'Person',
            name: siteConfig.author,
            url: siteConfig.authorUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.publisher,
            url: siteConfig.siteUrl,
          },
          datePublished: data.publishDateISO,
          mainEntityOfPage: pageUrl,
        }
      )
    }

    // Page SEO Schema
    if (pageSEO) {
      schemaOrgJSONLD.push({
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        url: pageUrl,
        name: title,
      })
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="image" content={image} />
        <meta name="description" content={description} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:title" content={title} />
        {postSEO ? <meta property="og:type" content="article" /> : null}

        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={imgWidth} />
        <meta property="og:image:height" content={imgHeight} />
        <meta property="og:description" content={description} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={siteConfig.userTwitter ? siteConfig.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    )
  }
}

export default SEO
