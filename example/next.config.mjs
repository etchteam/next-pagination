import withSourceMaps from '@zeit/next-source-maps'

const isProd = (process.env.NODE_ENV || 'production') === 'production'

export default withSourceMaps()({
  assetPrefix: isProd ? '/next-pagination' : undefined,
  basePath: isProd ? '/next-pagination' : undefined
})
