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
  repoLink,
  pieceLink,
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
      headline: title,
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
      mainEntity: {
        '@type': 'WebApplication',
        '@id': repoLink,
        name: title,
        author: {
          '@type': 'Person',
          description,
          name: siteConfig.author,
          url: siteConfig.authorUrl,
        },
        discussionURL: `${repoLink}/issues`,
        url: pieceLink,
        mainEntityOfPage: `${siteConfig.siteUrl}/${slug}`,
      },
    },
  ]
}
