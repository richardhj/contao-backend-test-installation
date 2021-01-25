<?php

declare(strict_types=1);

namespace Acme\ContaoCustomThemeBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

final class AcmeContaoCustomThemeExtension extends Extension implements PrependExtensionInterface
{

    public function load(array $configs, ContainerBuilder $container): void
    {
    }

    public function prepend(ContainerBuilder $container): void
    {
        $bundles = $container->getParameter('kernel.bundles');
        if (!isset($bundles['WebpackEncoreBundle'])) {
            return;
        }

        $container->prependExtensionConfig(
            'webpack_encore',
            [
                'output_path' => '',
                'builds'      => [
                    'acme_contao_custom' => '%kernel.project_dir%/web/bundles/acmecontaocustomtheme/'
                ]
            ]
        );
    }
}
