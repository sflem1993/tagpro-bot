const path = require('path')
const WebpackUserscript = require("webpack-userscript")

module.exports = {
	entry: './src/injectBot.js',
	mode: 'development',
	output: {
		path: require('path').join(__dirname, './dist'),
    	filename: 'bundledBot.js'
	},
	plugins: [
    	new WebpackUserscript({
    		headers: path.join(__dirname, 'userscriptInfo.json'),
    		pretty: true,
    		renameExt: false
		})
	]
};