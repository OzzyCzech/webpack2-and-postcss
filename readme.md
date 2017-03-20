# Webpack 2 + PostCSS + CSSnext

> [LESS](http://lesscss.org/) a [SASS](http://sass-lang.com/) jsou mrtvé, ať žije [postCSS](http://postcss.org/) a [CSSnext](http://cssnext.io/) :-)

Tohle repo je **příklad** toho, jak rozchodit ve své aplikaci *postcss* s využitím [Webpack2](https://webpack.js.org/) a [Yarn](https://yarnpkg.com/lang/en/) - jdeme na věc:
  
1. Začneme instalací potřebných balíčků:

		yarn add --dev extract-text-webpack-plugin css-loader
		yarn add --dev postcss postcss-loader postcss-cssnext postcss-import

	Slovníček:
	
	* **extract-text-webpack-plugin** nám extrahuje CSS soubory do statických souborů (proč? cache, HTTP2, přehlednost)
	* **css-loader** bude náš fallback, pokud se nepovede extrahovat CSS soubory (vhodne také pri dev modu a hot reload)
	* **postcss** je nástroje pro transformaci CSS pomocí JavaScript
	* **postcss-loader** je webpack loader pro postcss
	* **postcss-cssnext** je rozšíření *postcss* přidává podporu nového CSS pro starší browsery [CSSnext](http://cssnext.io/)
	* **postcss-import** PostCSS plugin pro inline [@import](https://github.com/postcss/postcss-import)	   

2. Upravíme svůj `webpack.config.js` přidáním nového pravidla:

		module: {
		  rules: [
			    {
		      test: /\.css$/,
		      use: ExtractTextPlugin.extract({
		        fallback: "style-loader",
		        use: ['css-loader', 'postcss-loader']
		      })
		    }
		  ]
		},
 
3. Vygenerovaný CSS soubor se bude chtít ukládat do `dist/style.css` proto přidáme do `webpack.config.js` následující:

		plugins: [
		  new ExtractTextPlugin("style.css"),
		]

   a ověříme, že již obsahuje definovanou cestu

		output: {
		  path: path.resolve(__dirname, 'dist'),			
		},

4. Nastavíme **postcss** - konfigurace jsou nově načítány ze souboru `./postcss.config.js`

		module.exports = {
		  plugins: {
		    'postcss-import': {},
		    'postcss-cssnext': {
		      browsers: ['last 2 versions', '> 5%'],
		    },
		  },
		};
  
5. Spustíme `yarn run build` - který máme nastavený v `package.json` následovně:

		"scripts": {
		  "build": "webpack --progress --colors"
		}

6. Pokud budeme potřebovat načítat v CSS **statické soubory**, například obrázky přes `url()`,
	budeme muset přidat následující:
  
		yarn add --dev img-loader file-loader url-loader
    
	A ještě upravit `webpack.config.js` přidáním:
  
		{
		  test: /\.(jpe?g|png|gif|svg)$/i,
		  use: [ 'url-loader?limit=10000', 'img-loader']
		}
 
## Použité zdroje

* [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
* [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
* [Webpack2](https://webpack.js.org/)
* [CSS Next features](http://cssnext.io/features/)


PS: [babel](https://babeljs.io/) je zde pouze z důvodu použití ES6 syntaxe v `webpack.config.babel.js`
