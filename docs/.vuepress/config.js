module.exports = {
  title: 'Jedi Cat Vue.js',
  description: 'Guia de bolso para consultas rápidas de Vue.js',
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
        title: 'Vue.js',
        children: [
          '/guide/vuejs/introducao',
          '/guide/vuejs/intalacao',
          '/guide/vuejs/configuracao',
          '/guide/vuejs/data',
          '/guide/vuejs/interpolacao',
          '/guide/vuejs/diretivas',
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
        title: 'Storybook.js',
        children: [
          '/guide/storybook/introducao'
        ]
      }
    ]
  }
}