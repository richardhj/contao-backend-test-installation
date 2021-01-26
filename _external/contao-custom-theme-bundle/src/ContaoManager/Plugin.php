<?php

namespace Acme\ContaoCustomThemeBundle\ContaoManager;

use Acme\ContaoCustomThemeBundle\AcmeContaoCustomThemeBundle;
use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;

class Plugin implements BundlePluginInterface
{
    public function getBundles(ParserInterface $parser): array
    {
        return [
            BundleConfig::create(AcmeContaoCustomThemeBundle::class)
                ->setLoadAfter([ContaoCoreBundle::class])
        ];
    }
}
