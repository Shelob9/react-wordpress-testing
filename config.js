const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://wpreacttesting.io",
    gaTrackingId: null
  },
  header: {
    logo:
      "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/favicon.png",
    logoLink: "https://learn.hasura.io",
    title: "JavaScript Testing In And Around WordPress",
    githubUrl: "https://github.com/shelob9/react-testing-wordpress-book",
    helpUrl: "",
    tweetText: "",
    links: [{ text: "", link: "" }],
    search: {
      enabled: false,
      indexName: "",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY
    }
  },
  sidebar: {
    forcedNavOrder: ["/introduction", "/testing-background"],
    links: [
      { text: "Josh", link: "https://JoshPress.net" },
      { text: "Saturday Drive", link: "https://saturdaydrive.io" }
    ],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: "JavaScript Testing In And Around WordPress | Josh Pollock",
    description: "Documentation built with mdx. Powering learn.hasura.io ",
    ogImage: null,
    docsLocation:
      "https://github.com/shelob9/react-testing-wordpress-book/tree/master/content",
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
  }
};

module.exports = config;
