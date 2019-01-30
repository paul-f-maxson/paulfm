import React from 'react'
import Helmet from 'react-helmet'
import siteConfig from '../../utils/siteConfig'

import { websiteSchema, portfolioPieceSchema } from './schemaOrg'

const SEO = ({
  title,
  description,
  pageUrl,
  imageURL,
  imgWidth,
  imgHeight,
  // 
  forPortfolioPiece,
  publishDateISO,
}) => {
  const schemaOrgJSONLD = [
    ...websiteSchema(),
    ...(forPortfolioPiece
      ? portfolioPieceSchema({
          title,
          pageUrl,
          imageURL,
          imgWidth,
          publishDateISO,
        })
      : []),
  ]
  return <Helmet>
      {/* General tags */}
    <meta name="image" content={imageURL || siteConfig.siteUrl + siteConfig.shareImage} />
      <meta name="description" content={description || siteConfig.siteDescription} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:title" content={title || siteConfig.siteTitle} />
      {forPortfolioPiece ? <meta property="og:type" content="article" /> : null}

      <meta property="og:url" content={pageUrl || siteConfig.siteUrl} />
      <meta property="og:image" content={imageURL || siteConfig.siteUrl + siteConfig.shareImage} />
      <meta property="og:image:width" content={imgWidth || siteConfig.shareImageWidth} />
      <meta property="og:image:height" content={imgHeight || siteConfig.shareImageHeight} />
      <meta property="og:description" content={description || siteConfig.siteDescription} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {siteConfig.userTwitter ? <meta name="twitter:creator" content={siteConfig.userTwitter} /> : null}
      <meta name="twitter:title" content={title || siteConfig.siteTitle} />
    <meta name="twitter:image" content={imageURL || siteConfig.siteUrl + siteConfig.shareImage} />
      <meta name="twitter:description" content={description} />
    </Helmet>
}

export default SEO
