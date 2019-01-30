import React from 'react'
import Helmet from 'react-helmet'
import siteConfig from '../utils/siteConfig'
import { defaultWebsiteSchema } from '../schemaOrg'

const SEO = ({
  title,
  description,
  slug,
  imageURL,
  imageWidth,
  imageHeight,
  additionalSchemaOrgJSONLD,
  additionalMetaTags,
}) => (
  <Helmet>
    {/* General tags */}
    <meta
      name="image"
      content={imageURL || `${siteConfig.siteUrl}/${siteConfig.shareImage}`}
    />
    <meta
      name="description"
      content={description || siteConfig.siteDescription}
    />

    {/* Schema.org tags */}
    <script type="application/ld+json">
      {JSON.stringify([
        ...defaultWebsiteSchema(),
        ...(additionalSchemaOrgJSONLD || []),
      ])}
    </script>

    {/* OpenGraph tags */}
    <meta property="og:title" content={title || siteConfig.siteTitle} />

    <meta
      property="og:url"
      content={`${siteConfig.siteUrl}/${slug}` || siteConfig.siteUrl}
    />
    <meta
      property="og:image"
      content={imageURL || siteConfig.siteUrl + siteConfig.shareImage}
    />
    <meta
      property="og:image:width"
      content={imageWidth || siteConfig.shareImageWidth}
    />
    <meta
      property="og:image:height"
      content={imageHeight || siteConfig.shareImageHeight}
    />
    <meta
      property="og:description"
      content={description || siteConfig.siteDescription}
    />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    {siteConfig.userTwitter ? (
      <meta name="twitter:creator" content={siteConfig.userTwitter} />
    ) : null}
    <meta name="twitter:title" content={title || siteConfig.siteTitle} />
    <meta
      name="twitter:image"
      content={imageURL || siteConfig.siteUrl + siteConfig.shareImage}
    />
    <meta name="twitter:description" content={description} />

    {additionalMetaTags}
  </Helmet>
)

export default SEO
