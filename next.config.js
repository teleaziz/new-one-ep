
module.exports = {
  images: {
    domains: ['cdn.builder.io'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // this will allow site to be framed under builder.io for wysiwyg editing
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.builder.io https://builder.io',
          },
        ],
      },
    ]
  },
  env: {
    ELASTICPATH_CLIENT_ID: process.env.ELASTICPATH_CLIENT_ID,
    // expose env to the browser
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
  },
}
