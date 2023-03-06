exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: `/404`,
    toPath: `/404/`,
    statusCode: 200,
  })
}