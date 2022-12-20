/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://if-i-die-tomorrow.com',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  // ...other options
  robotsTxtOptions: {
    transformRobotsTxt: async (
      _,
      robotsTxt,
    ) => `${robotsTxt}\n\n#DaumWebMasterTool:b0b73c85f79264f6c3bfd5f8a025a208bdeadebcbfddd588f78b68c1ed10a54a:r4NAJ8pvqY6Ci7LbU16V1w==
      `,
  },
}
