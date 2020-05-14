const withSourceMaps = require('@zeit/next-source-maps')();

const isProd = (process.env.NODE_ENV || 'production') === 'production'

module.exports = withSourceMaps({
  assetPrefix: isProd ? '/next-pagination' : '',
  experimental: {
    basePath: isProd ? '/next-pagination' : ''
  }
});
