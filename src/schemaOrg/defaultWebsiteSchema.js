import siteConfig from '../utils/siteConfig'

export default () => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: siteConfig.siteUrl,
    name: siteConfig.siteTitle,
    alternateName: siteConfig.siteTitleAlt || '',
  },
]
