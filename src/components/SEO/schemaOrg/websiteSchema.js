import siteConfig from '../../../utils/siteConfig'

// Default Website Schema
export default () => ([
    {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteConfig.siteUrl,
        name: siteConfig.siteTitle,
        alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
    },
])