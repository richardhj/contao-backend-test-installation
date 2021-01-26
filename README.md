Contao Open Source CMS :: Test installation :: New backend theme
================================================================

The purpose of this repository is to demonstrate the new backend theme.

Working branch: https://github.com/contao/contao/compare/4.x...richardhj:tng-backend

Kickstart this project
----------------------

```
git checkout git@github.com:richardhj/contao-backend-test-installation.git && cd contao-backend-test-installation
composer install
echo "DATABASE_URL=mysql://user:password@localhost:3306/contao_test" >> .env.local
php vendor/bin/contao-console contao:migrate
symfony serve
```

Server-mode and local-mode
--------------------------

The new backend can be used as-is ("server mode") or entirely customized ("local mode").

In the server-mode, Contao will include the distribution files (of all bundles). Each bundle therefore has to provide 
the distribution files.

In the local-mode, the developer wants to build the theme on their own. Therefore, it is possible to create a local
Webpack/Encore config and include all source files. For this to work, we make use of "Symfony UX" that makes all
packages available in the local package.json.

How third-party bundles can add their styles
--------------------------------------------

Just use the good old GLOBALS.

```php
if (TL_MODE === 'BE') {
    $GLOBALS['TL_CSS'][] = '/bundles/acmecontaocustomcss/be_custom.css';
}
```

This works for all modes: with the default theme, when the backend theme is built locally, and with third-party themes.

We introduced the following twig functions, that are heavily based on the twig functions from the [webpack-encore-bundle](https://github.com/symfony/webpack-encore-bundle/).

```twig
{{ contao_backend_link_tags('app', null, theme) }}
{{ contao_backend_script_tags('app', null, theme) }}
```

The twig functions returns all `<script>` or `<link>` tags of the current backend theme, AND the files added manually via `$GLOBALS` and `contao.backend.custom_css`.

How Symfony-Encore is used
--------------------------

We implemented Symfony Encore for the backend assets. Thus, the Symfony documentation about Encore also applies for
Contao backend themes: https://symfony.com/doc/current/frontend/encore/simple-example.html

We customized the implementation of Encore in Contao, to be able to easily register backend themes and add custom
CSS/JS files on the fly. Thus, instead of the `encore_entry_link_tags()` twig function, you use `contao_backend_link_tags()`.

Also, the customized implementation of Encore ensures the Encore bundle is not conflicting when used in the frontend.

How to create a reusable Contao backend theme
---------------------------------------------

A reusable backend theme provides the entire CSS/JS and can activated via the user settings.

A Contao backend theme has to use Encore, that is, because Encore creates a [`entrypoints.json`](_external/contao-custom-theme-bundle/src/Resources/public/entrypoints.json)
that tells Contao what files to add to the page.

Secondly, a Contao theme has to be registered by making use of a [tagged service](_external/contao-custom-theme-bundle/src/Resources/config/services.yml).

Please have a look at the exemplary bundle in [contao-custom-theme-bundle](_external/contao-custom-theme-bundle).


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

All you need to do is to inject this CSS to the backend page, e.g. via `$GLOBALS['TL_CSS']` (see above).

Other than that, you can configure and override the color palette in a local `tailwind.config.js` file,
either by using a local theme (see below), or a reusable theme (see above).
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

Consistently, the 500 shade is used as *true* color.

How to override any part of the theme
-------------------------------------

You can override any part of the backend by just overriding the template,
e.g. `@ContaoCore/Backend/Layout/sidebar.html.twig`.
To add a new section to the sidebar, create the following template:

```twig

```

How to build the backend theme locally
--------------------------------------

The backend theme uses Webpack (via Symfony’s Webpack Encore) to manage its CSS and JavaScript assets.
The Contao core-bundle provides both the source files and the compiled versions of all assets,
so the Contao backend theme can be used as-is.

However, if you want total control over the backend styles, you can use Webpack to integrate the CSS and JavaScript
source files provided in the core-bundle's `assets/` directory.

All you need to do is to set the local theme path in the config:

```yaml
contao:
  backend:
    theme_path: '%kernel.project_dir%/web/layout/backend/entrypoints.json'
```

For this to work, you need to set up Encore correctly. You can see that the "output path" matches the path above.

```js
const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('web/layout/backend')
    .setPublicPath('/layout/backend')
    .setManifestKeyPrefix('')
    
    .enablePostCssLoader((options) => {})
;

backendConfig = Encore.getWebpackConfig();
backendConfig.name = 'contao_backend';

module.exports = [backendConfig];
```

If you want more flexibility with the Tailwind config, you can create your own `tailwind.config.js`
and just import Contao's tailwind preset in there:

```js
const { tailwindPreset: contaoPreset } = require('@contao/backend');

module.exports = {
    presets: [
        contaoPreset
    ],
    theme: {
        extend: {
            colors: {
                brand: '#ff0000'
            },
        },
    },
};
```

BC Layer
--------

Falls back to the old templates, when

- [ ] custom be_main.html5 detected (TODO)
- [x] other backend theme than "flexible" detected
