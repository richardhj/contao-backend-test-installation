<?php

namespace Acme\ContaoCustomCssBundle\ContaoManager;

use Acme\ContaoCustomCssBundle\AcmeContaoCustomCssBundle;
use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;

class Plugin implements BundlePluginInterface
{
    public function getBundles(ParserInterface $parser): array
    {
        return [
            BundleConfig::create(AcmeContaoCustomCssBundle::class)
                ->setLoadAfter([ContaoCoreBundle::class])
        ];
    }
}
