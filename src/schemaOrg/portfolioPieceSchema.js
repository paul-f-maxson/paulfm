import siteConfig from '../utils/siteConfig'

// Portfolio Entry Schema
export default ({title, pageUrl, imageURL, imgWidth, imgHeight, publishDateISO}) => ([
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
    '@type': 'Article',
    url: pageUrl,
    name: title,
    alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
    headline: title,
    imageURL: {
      '@type': 'ImageObject',
      url: imageURL,
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
    datePublished: publishDateISO,
    mainEntityOfPage: pageUrl,
  },
])
