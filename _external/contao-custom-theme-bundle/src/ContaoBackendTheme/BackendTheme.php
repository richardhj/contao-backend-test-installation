<?php

namespace Acme\ContaoCustomThemeBundle\ContaoBackendTheme;

use Contao\CoreBundle\BackendTheme\BackendThemeInterface;

final class BackendTheme implements BackendThemeInterface
{

    public function getThemePath(): string
    {
        return 'web/bundles/acmecontaocustomtheme/entrypoints.json';
    }
}
