/* eslint-disable @typescript-eslint/no-var-requires */
const withSourceMaps = require('@zeit/next-source-maps')()

const isProd = (process.env.NODE_ENV || 'production') === 'production'

module.exports = withSourceMaps({
  assetPrefix: isProd ? '/next-pagination' : undefined,
  basePath: isProd ? '/next-pagination' : undefined
})
