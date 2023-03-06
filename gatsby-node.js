exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: `/*`,
    toPath: `/`,
    statusCode: 404,
    conditions: {
      country: `us`
    }
  })
}