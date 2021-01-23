const Encore = require('@symfony/webpack-encore');

let config;
const configs = [];

Encore
    .setOutputPath('web/layout/backend')
    .setPublicPath('./')
    .setManifestKeyPrefix('bundles/contaocore')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .disableSingleRuntimeChunk()

    .addEntry()
    .addStyleEntry()
    .enablePostCssLoader()
;

config = Encore.getWebpackConfig();
config.name = 'contao_core';

configs.push(config);

module.exports = configs;
