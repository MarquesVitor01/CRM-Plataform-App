const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules[\\/]html2pdf\.js/, 
        ],
      },
    ],
  },
  devtool: false,
  resolve: {
    extensions: ['.js'],
  },
  ignoreWarnings: [
    {
      module: /html2pdf\.js/,
      message: /Failed to parse source map/,
    },
  ],
};
