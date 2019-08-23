module.exports = {
  title: 'Jedi Cat Dev',
  description: 'Guia de bolso para consultas rápidas.',
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
      { text: 'Site', link: 'https://vemlavaralouca.com.br' }
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
          '/guide/data',
          '/guide/diretivas',
          '/guide/rotas',
          '/guide/store',
          '/guide/i18n'
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