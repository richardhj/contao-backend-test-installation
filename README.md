Contao Open Source CMS :: Test installation :: New backend theme
================================================================

The purpose of this repository is to demonstrate the new backend theme.

Working branch: https://github.com/contao/contao/compare/4.x...richardhj:tng-backend

Kickstart this project
----------------------

Run `composer install`, configure database connection, run install tool, run `symfony serve`.

How to add the backend theme to your Encore config
--------------------------------------------------

The backend theme uses Webpack (via Symfony’s Webpack Encore) to manage its CSS and JavaScript assets.
The Contao core-bundle provides both the source files and the compiled versions of all assets,
so you don’t have to install Webpack to use this bundle.

However, if you want total control over the backend styles, you can use Webpack to integrate the SCSS and JavaScript
source files provided in the assets/ directory.

All you need to do is to override the `contao_backend` asset package via the config:

```yaml
framework:
  assets:
    packages:
      contao_backend:
        json_manifest_path: '%kernel.project_dir%/web/layout/backend/manifest.json'
```

For this to work, you need to set up Encore correctly.

```js
const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('web/layout/backend')
    .setPublicPath('/layout/backend')
    .setManifestKeyPrefix('')
    
    .enablePostCssLoader((options) => {})
;

config = Encore.getWebpackConfig();
config.name = 'contao_backend';

configs.push(config);

module.exports = configs;
```

How to change the color palette
-------------------------------

Two ways to achieve this.

Either you define or override the CSS variables.

```css
:root {
    --color-primary-50: #FFFFFF;
    --color-primary-100: #FEF6FA;
    --color-primary-200: #FAD2E5;
    --color-primary-300: #F5ADD0;
    --color-primary-400: #F189BB;
    --color-primary-500: #ED64A6;
    --color-primary-600: #E8368C;
    --color-primary-700: #D31872;
    --color-primary-800: #A51359;
    --color-primary-900: #770E41;
}
```

All you need to do is to inject this CSS to the backend page. (ADD HOWTO).

Other than that, you can configure and override the color palette in a local `tailwind.config.js` file. (ADD HOWTO).
This example is showing you how to define an extra color palette called "brand".

```js
module.exports = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: 'var(--color-brand-50, #FFFFFF)',
                    100: 'var(--color-brand-100, #FEF6FA)',
                    200: 'var(--color-brand-200, #FAD2E5)',
                    300: 'var(--color-brand-300, #F5ADD0)',
                    400: 'var(--color-brand-400, #F189BB)',
                    500: 'var(--color-brand-500, #ED64A6)',
                    600: 'var(--color-brand-600, #E8368C)',
                    700: 'var(--color-brand-700, #D31872)',
                    800: 'var(--color-brand-800, #A51359)',
                    900: 'var(--color-brand-900, #770E41)',
                },
            },
        },
    },
};
```

The `var()` syntax is optional if you don't want to use CSS variables.

Consequently, the 500 shade is used as *true* color.

How to override any part of the theme
-------------------------------------

You can override any part of the backend by just overriding the template,
e.g. `@ContaoCore/Backend/Layout/sidebar.html.twig`. 
To add a new section to the sidebar, create the following template:

```html

```

…

BC Layer
--------

Falls back to the old templates, when

- [ ] custom be_main.html5 detected (TODO)
- [ ] other backend theme than "flexible" detected (TODO)
