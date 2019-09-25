const favicon =
  "https://rawcdn.githack.com/Shelob9/react-wordpress-testing/c85f38745d862f5f9d14792c4f52881a4568cdfd/triangle-trans.png";
const config = {
  gatsby: {
    pathPrefix: "/react-wordpress-testing",
    siteUrl: "https://shelob9.github.io/react-wordpress-testing",
    gaTrackingId: null
  },
  header: {
    logo: favicon,
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
    favicon
  }
};

module.exports = config;
