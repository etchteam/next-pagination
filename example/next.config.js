/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps')()

const isDeploy = process.env.EXAMPLE_DEPLOY === 'true'

module.exports = withSourceMaps({
  output: isDeploy ? 'export' : undefined,
  assetPrefix: isDeploy ? '/next-pagination' : undefined,
  basePath: isDeploy ? '/next-pagination' : undefined
})
