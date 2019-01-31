import siteConfig from '../utils/siteConfig'

export default ({ fullName, shortBio, timeToRead, imageUrl, imageWidth, imageHeight, imageCaption, body }) => [
  {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@id': siteConfig.siteUrl, name: siteConfig.siteTitle },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: { '@id': `${siteConfig.siteUrl}/about`, name: 'About Page' },
      },
    ],
  },
  {
    '@context': 'http://schema.org',
    '@type': 'AboutPage',
    '@id': `${siteConfig.siteUrl}/about`,
    title: `About - ${siteConfig.siteTitle}`,
    mainEntity: {
      '@type': 'Person',
      mainEntityofPage: `${siteConfig.siteUrl}/about`,
      additionalName: fullName,
      description: shortBio,
    },
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: imageWidth,
      height: imageHeight,
      caption: imageCaption,
    },
    text: body,
    timeRequired: timeToRead,
  },
]
