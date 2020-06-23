const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  // console.log(process.env.NODE_ENV);
  return {
    mode: process.env.NODE_ENV,
    entry: './client/app.jsx',
    output: {
      path: `${__dirname}/build`,
      filename: 'bundle.js',
    },

    devServer: {
      proxy: {
        '/api/leaders': 'http://localhost:3000',
      },
      publicPath: 'http://localhost:8080/build/',
    },

    plugins: [new MiniCssExtractPlugin()],

    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
  };
};
