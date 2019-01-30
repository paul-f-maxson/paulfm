import siteConfig from '../utils/siteConfig'

const schema = [
    {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteConfig.siteUrl,
        name: siteConfig.siteTitle,
        alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
    },
]

export default () => schema
    

