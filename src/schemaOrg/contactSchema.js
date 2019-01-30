import siteConfig from '../utils/siteConfig'

import {defaultWebsiteSchema} from './'

export default () => [
  ...defaultWebsiteSchema(),
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
      title: `Contact - ${siteConfig.siteTitle}`,
  },
]