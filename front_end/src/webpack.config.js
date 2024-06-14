const path = require('path');

module.exports = {
  entry: './src/index.js', // Update this with your actual entry point file
  output: {
    path: path.resolve(__dirname, 'dist'), // Update this with your desired output directory
    filename: 'bundle.js' // Update this with your desired output file name
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "buffer": require.resolve("buffer/"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http")
    }
  },
  module: {
    rules: [
      // Add your loader configurations here
      // Example:
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    // Add your plugin configurations here
  ]
};