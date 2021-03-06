const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('web/layout/backend')
    .setPublicPath('/layout/backend')
    .setManifestKeyPrefix('')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .disableSingleRuntimeChunk()

    .addEntry('app', './vendor/contao/contao/core-bundle/assets/js/app.js')
    .copyFiles({
        from: './vendor/contao/contao/core-bundle/assets/images/',
        to: 'images/[path][name].[ext]',
    })
    .enablePostCssLoader((options) => {})
;

backendConfig = Encore.getWebpackConfig();
backendConfig.name = 'contao_backend';

module.exports = [backendConfig];
