const isProd = (process.env.NODE_ENV || 'production') === 'production';

module.exports = {
  assetPrefix: isProd ? '/next-pagination' : undefined,
  basePath: isProd ? '/next-pagination' : undefined,
};
