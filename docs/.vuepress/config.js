module.exports = {
  title: 'Jedi Cat Vue.js',
  description: 'Guia de bolso para consultas rápidas',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    searchMaxSuggestions: 10,
    serviceWorker: {
      updatePopup: true,
      updatePopup: {
        message: "Novo conteúdo disponível.",
        buttonText: "Atualizar"
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guia', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/TonhaoSantos/jedi_cat_vuejs' }
    ],
    sidebar: [
      {
        title: 'Guia',
        children: [
          '/guide/'
        ]
      },
      {
        title: 'Arduino',
        children: [
          '/guide/arduino/introducao',
          '/guide/arduino/eletronica',
          '/guide/arduino/arduino',
          '/guide/arduino/comunicacaoserial',
          '/guide/arduino/modulos',
          '/guide/arduino/projetos'
        ]
      },
      {
        title: 'JavaScript',
        children: [
          '/guide/js/introducao',
          '/guide/js/ecmascript',
        ]
      },
      {
        title: 'Vue.js',
        children: [
          '/guide/vuejs/introducao',
          '/guide/vuejs/intalacao',
          '/guide/vuejs/configuracao',
          '/guide/vuejs/inline',
          '/guide/vuejs/data',
          '/guide/vuejs/interpolacao',
          '/guide/vuejs/diretivas',
          '/guide/vuejs/css-scoped',
          '/guide/vuejs/abreviacao',
          '/guide/vuejs/lifecycle',
          '/guide/vuejs/components',
          '/guide/vuejs/props',
          '/guide/vuejs/computed',
          '/guide/vuejs/methods',
          '/guide/vuejs/filters',
          '/guide/vuejs/watch',
          '/guide/vuejs/rotas',
          '/guide/vuejs/emit',
          '/guide/vuejs/plugin',
          '/guide/vuejs/store',
          '/guide/vuejs/i18n',
          '/guide/vuejs/axios'
        ]
      },
      {
        title: 'BEM',
        children: [
          '/guide/bem/introducao'
        ]
      },
      {
        title: 'GIT',
        children: [
          '/guide/git/introducao'
        ]
      },
      {
        title: 'Mock',
        children: [
          '/guide/mock/introducao'
        ]
      },
      {
        title: 'Task Runner',
        children: [
          '/guide/taskrunner/introducao',
          '/guide/taskrunner/gulp'
        ]
      },
      {
        title: 'Versionamento Semantico',
        children: [
          '/guide/versionamento/introducao'
        ]
      },
      {
        title: 'Package',
        children: [
          '/guide/package/introducao',
          '/guide/package/npm',
          '/guide/package/yarn'
        ]
      },
      {
        title: 'CDN',
        children: [
          '/guide/cdn/introducao'
        ]
      },
      {
        title: 'Vunerabilidade',
        children: [
          '/guide/vunerabilidade/introducao'
        ]
      },
      {
        title: 'CLI',
        children: [
          '/guide/cli/introducao'
        ]
      },
      {
        title: 'Google Extensao',
        children: [
          '/guide/googleextensao/introducao'
        ]
      },
      {
        title: 'Snippets',
        children: [
          '/guide/snippets/introducao'
        ]
      },
      {
        title: 'JavaScript',
        children: [
          '/guide/javascript/introducao'
        ]
      },
      {
        title: 'Web Scraping',
        children: [
          '/guide/webscraping/introducao',
          '/guide/webscraping/siteestatico',
          '/guide/webscraping/sitedinamico'
        ]
      },
      {
        title: 'Storybook.js',
        children: [
          '/guide/storybook/introducao'
        ]
      }
    ]
  }
}