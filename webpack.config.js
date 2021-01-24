const Encore = require('@symfony/webpack-encore');

let config;
const configs = [];

Encore
    .setOutputPath('web/layout/backend')
    .setPublicPath('/layout/backend')
    .setManifestKeyPrefix('')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .disableSingleRuntimeChunk()

    .addEntry('js/app', './vendor/contao/contao/core-bundle/assets/js/app.js')
    .addStyleEntry('styles/app', './vendor/contao/contao/core-bundle/assets/styles/app.css')
    .copyFiles({
        from: './vendor/contao/contao/core-bundle/assets/images/',
        to: 'images/[path][name].[ext]',
    })
    .enablePostCssLoader((options) => {})
;

config = Encore.getWebpackConfig();
config.name = 'contao_backend';

configs.push(config);

module.exports = configs;
