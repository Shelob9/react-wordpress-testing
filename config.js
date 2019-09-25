const config = {
  gatsby: {
    pathPrefix: "/react-wordpress-testing",
    siteUrl: "https://shelob9.github.io/react-wordpress-testing",
    gaTrackingId: null
  },
  header: {
    logo: "https://placekitten.com/250/250",
    logoLink: "/",
    title: "JavaScript Testing In And Around WordPress",
    githubUrl: "https://github.com/shelob9/react-wordpress-testing",
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
    forcedNavOrder: [
      "/introduction",
      "/testing-background",
      "/testing-react-apps",
      "/testing-react-wordpress-blocks",
      "/next",
      "/about"
    ],
    links: [
      { text: "Josh", link: "https://JoshPress.net" },
      { text: "Saturday Drive", link: "https://saturdaydrive.io" }
    ],
    frontline: false,
    ignoreIndex: true
  },
  siteMetadata: {
    title: "JavaScript Testing In And Around WordPress | Josh Pollock",
    description:
      "Learn how to develop test-driven React apps and WordPress blocks.",
    ogImage: null,
    docsLocation:
      "https://github.com/shelob9/react-wordpress-testing/tree/master/content",
    favicon: "https://placekitten.com/250/250"
  }
};

module.exports = config;
