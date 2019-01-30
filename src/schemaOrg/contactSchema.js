import siteConfig from '../utils/siteConfig'

export default () => [
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
        item: { '@id': `${siteConfig.siteUrl}/contact`, name: 'Contact Page' },
      },
    ],
  },
  {
    '@context': 'http://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteConfig.siteUrl}/contact`,
    title: `Contact - ${siteConfig.siteTitle}`,
  },
]
