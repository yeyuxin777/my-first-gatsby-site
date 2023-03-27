/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    author: `yuxin.ye`
  },
  plugins: [
    "gatsby-plugin-sass", 
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [process.env.GATSBY_GA_MEASUREMENT_ID],
        gtagConfig: {
          optimize_id: [process.env.GATSBY_GTM_ID],
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-4YXCBMNFNM"
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "G-4YXCBMNFNM",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "https://www.googletagmanager.com",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },
  ]
};