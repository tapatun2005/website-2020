// Packages
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const transformImports = require('babel-plugin-transform-imports');

// Routes
const $views = './src/scripts/Views/'
const $pages = './src/templates/Views/'

export const Config = {
    views: _readFiles($views),
    pages: _readFiles($pages),
    htmlPlugins: _generateHTMLplugins($pages),
    babelLoader: _babelLoader()
}

function _readFiles(dir) {
    
  const obj = {}

  fs.readdirSync(dir).forEach(filename => {
    
    const name = path.parse(filename).name
    const filepath = path.resolve(dir, filename);
    const stat = fs.lstatSync(filepath)
    const isFile = stat.isFile();

    if (isFile) obj[name.toLowerCase()] = `${dir}${filename}`

  })

  return obj
}


function _generateHTMLplugins(dir) {
  return fs.readdirSync(dir).map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `${dir}/${name}.${extension}`,
      chunks: [name, 'vendors', 'runtime']
    })
  })
}

function _babelLoader() {
  return {
    loader: 'babel-loader',
    query: {
      plugins: [
        [transformImports, {
          'Functions': {
            transform: function(importName, matches) {
              return path.join(__dirname, "../src/scripts/Lib/Functions/") + importName;
            },
            preventFullImport: true
          },
          'Components': {
            transform: function(importName, matches) {
              return path.join(__dirname, "../src/scripts/Lib/Components/") + importName + '/' + importName;
            },
            preventFullImport: false
          }
        }]
      ]
    }
  }
}
