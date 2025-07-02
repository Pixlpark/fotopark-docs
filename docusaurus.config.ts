import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Документация Мой выпускной',
    tagline: 'Documentation',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://docs.moyvipusknoy.ru/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'Мой выпускной', // Usually your GitHub org/user name.
    projectName: 'fotopark-docs', // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: 'log',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/Pixlpark/fotopark-docs/tree/main/',
                    routeBasePath: '/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            logo: {
                alt: 'Pixlpark Documentation',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Документация',
                },
                {
                    href: "https://admin.moyvipusknoy.ru/",
                    position: 'left',
                    label: 'Панель управления',
                },
                {
                    href: "https://t.me/moyvipusknoy_news",
                    position: 'left',
                    label: 'Новости',
                },
                {
                    href: "https://t.me/MoyVipusknoySupport_bot",
                    position: 'left',
                    label: 'Поддержка',
                },
            ],
        },
        docs: {
            sidebar: {
                hideable: true,
                autoCollapseCategories: true,
            },
        },
        algolia: {
            appId: 'CBISSLUS3P',
            apiKey: '5fbb925f3ae404c5e3f239aedc2c0eca',
            indexName: 'pixlpark',

            // Optional: see doc section below
            contextualSearch: false,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
