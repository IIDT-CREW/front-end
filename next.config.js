/* eslint-disable @typescript-eslint/no-var-requires */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// const withTM = require('next-transpile-modules')

/** @type {import('next').NextConfig} */
// const config = {
//   images: {
//     domains: ['img.seadn.io'],
//   },
//   compiler: {
//     styledComponents: true,
//   },
//   experimental: {
//     scrollRestoration: true,
//   },
//   reactStrictMode: true,
// }

// module.exports = withBundleAnalyzer(withTM(config))

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = withBundleAnalyzer({
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['img.seadn.io', 'images.unsplash.com', 'source.unsplash.com', '127.0.0.1'],
  },
  compress: true,
  webpack(config) {
    //console.log(config);
    const prod = process.env.NODE_ENV === 'production'
    console.log('prod = ', prod)
    // 플러그인 관련 설정
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${['javascript', 'python'].join('|')})$`),
      ),
    ]
    if (prod) {
      plugins.push(new CompressionPlugin())
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : config.devtool,
      plugins,
    }
  },
})
