import siteConfig from '../utils/siteConfig'

// Portfolio Entry Schema
export default ({
  title,
  slug,
  imageURL,
  imgWidth,
  imgHeight,
  description,
  wordCount,
  timeToRead,
  tagTitles,
  body,
  publicationDateISO,
}) => {
  return [
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
          item: { '@id': `${siteConfig.siteUrl}/${slug}`, name: title },
        },
      ],
    },
    {
      '@context': 'http://schema.org',
      '@type': 'Article',
      url: `${siteConfig.siteUrl}/${slug}`,
      name: title,
      alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : '',
      headline: title,
      description: description,
      mentions: tagTitles,
      keywords: tagTitles,
      wordCount: wordCount,
      timeRequired: timeToRead,
      articleBody: body,
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
        url: siteConfig.authorUrl,
      },
      datePublished: publicationDateISO,
      mainEntityOfPage: `${siteConfig.siteUrl}/${slug}`,
    },
  ]
}
