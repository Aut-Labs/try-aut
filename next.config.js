const withPlugins = require('next-compose-plugins');

const nextConfig = {
  images: {
    domains: [],
  },
};

module.exports = withPlugins([], nextConfig);
