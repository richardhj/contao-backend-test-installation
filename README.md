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

…

How to change the color palette
-------------------------------

…

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
