createRedirect({
  fromPath: `/*`,
  toPath: `/`,
  statusCode: 404,
  conditions: {
    country: `us`
  }
})