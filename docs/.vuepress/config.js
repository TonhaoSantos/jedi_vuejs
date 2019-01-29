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
          '/guide/introducao',
          '/guide/intalacao',
          '/guide/configuracao',
          '/guide/diretivas',
          '/guide/rotas',
          '/guide/store'
        ]
      },
      {
        title: 'Storybook.js',
        children: [
          '/guide/introducao',
          '/guide/intalacao',
          '/guide/diretivas',
          '/guide/rotas',
          '/guide/store'
        ]
      }
    ]
}
}