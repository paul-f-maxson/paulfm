import siteConfig from '../utils/siteConfig'
import { portfolioPieceSchema } from './'

export default ({ pieces }) => {
  const schemaParts = pieces.map(({ slug }) => ({
    '@id': `${siteConfig.siteUrl}/${slug}`,
  }))

  const schemaGraph = pieces.map(portfolioPieceSchema)

  return [
    {
      '@context': 'http://schema.org',
      '@graph': [
        {
          // NOTE: line below will have to change if index moves from landing page
          '@id': siteConfig.siteUrl,
          '@type': 'schema:Collection',
          accessMode: 'textual',
          creator: 'Paul F. Maxson',
          hasPart: schemaParts,
          name: "Paul Maxson's web development Portfolio",
        },
        ...schemaGraph,
      ],
    },
  ]
}
