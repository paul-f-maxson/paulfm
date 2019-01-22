module.exports = {
  siteTitle: 'Paul Maxson',
  siteTitleAlt: `My Portfolio`, // This allows an alternative site title for SEO schema.
  publisher: 'paul-f-maxson', // Organization name used for SEO schema
  siteDescription: `Paul Maxson's portfolio and public profile`,
  siteUrl: 'https://paulfm.netlify.com', // Site domain. Do not include a trailing slash! If you wish to use a path prefix you can read more about that here: https://www.gatsbyjs.org/docs/path-prefix/
  mainHeroContentfulAssetId: "2DUZFzwqAEW0swcuzbvL0Y", // Contentful ID for the index page hero
  piecesPerHomePage: 10, // Number of pieces shown on the 1st page of of the index.js template (home page)
  piecesPerPage: 20, // Number of pieces shown on paginated pages
  author: 'Paul Maxson', // Author for RSS author segment and SEO schema
  authorContentfulProfileId: "3e8zCQctMc0a0koO6MQg4Q", // used to build the About page
  authorUrl: 'https://github.com/paul-f-maxson', // URL used for author and publisher schema, can be a social profile or other personal site
  userTwitter: '@paulmaxson', // Change for Twitter Cards
  shortTitle: 'PaulFM', // Used for App manifest e.g. Mobile Home Screen
  shareImage: '/logos/share.jpg', // Open Graph Default Share Image. 1200x1200 is recommended
  shareImageWidth: 900, // Change to the width of your default share image
  shareImageHeight: 600, // Change to the height of your default share image
  siteLogo: '/logos/logo-512.png', // Logo used for SEO, RSS, and App manifest
  backgroundColor: '#e9e9e9', // Used for Offline Manifest
  themeColor: '#121212', // Used for Offline Manifest
  copyright: 'Copyright © 2018 Paul Maxson', // Copyright string for the RSS feed
}
