# Intalação
Anteriormente vimos as formas de se usar o vue sendo mais produtivo usando o ___Node.js___ e o ___NPM/Yarn___, mas não vamos importa-la manualmente.

Vamos usar uma ferramenta disponibilizada pelo nosso querido ___Évan___.

Esta ferramenta faz todo o trabalho **sujo** nos restando apenas baixar e iniciar projetos já pré configurados com:

- *esqueletos de códigos predefinidos*
- *minificadores*
- *testadores*
- *live-reload*
- *outros*

Nos dando **agilidade** na construção e configuração de um projeto.

O nome desta ferramenta é ___[Vue Cli](https://cli.vuejs.org/ "Gerenciador de templates")___ (Vue cielai, Vue C L I, Vue Clai, ...).

Como podemos observar ele é um gerenciador de templates.


## Nodejs
Primeiro de tudo vamos precisa instalar o Node.js.

Vamos entrar no site do [Nodejs](https://nodejs.org "Site Node.js") e na sessão **download** escolher a que se adeque ao seu **sistema operacional**.

Os passos que vou seguir são os para ___Linux___.

Com o **terminal** aberto digite:

```
$ sudo apt install nodejs
```

Apos finalizar, para saber se foi instalado digite:

``` js
$ nodejs --version

// ou

$ nodejs -v
```

## NPM
Por padrão ele já vem com o **Node.js** quando instalado nas versões mais recentes.

Se preferir usar ele ao inves de usar o **Yarn**, verique se está instalado.

``` js
$ npm --version
 
// ou
 
$ npm -v
```
Caso não esteja instalado, com o terminal aberto digite:

```js 
$ sudo apt install npm
```

Após finalizar, para saber se foi instalado utilize os passos descritos anteriormente.


## Yarn
Para instalar o **Yarn**, primeiro vamos precisar configurar o repositório.

Com o terminal aberto digite:
 
```js 
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Em seguida precisamos atualizar os pacotes, digite:

```js
$ sudo apt-get update
```

Para instalar digite: 

```js
$ sudo apt install yarn
```

Após finalizar, para saber se foi instalado digite:

```js
$ yarn --version
 
// ou
 
$ yarn -v
```


## CLI
A versão que utilizo é a 3 da **CLI**.

A CLI precisa ser instalada globalmente.

Para instalar a **CLI** com o terminal aberto digite: 

```js 
// NPM
npm install -g @vue/cli

// Yarn
$ yarn global add @vue/cli 
```

Apos finalizar, para saber se foi instalado digite:

```js 
$ vue --version
 
// ou
 
$ vue -v 
```

## Iniciando um projeto com CLI
Para iniciar um projeto com a **CLI 3** com o terminal aberto digite:

```js
$ vue create NomeDoProjeto
```

Escolha utilizando a tecla ___Espaço___ as opções que mais lhe agrade e aperte a tecla ___Enter___ quando for finalizar.

O projeto começará a ser criado e finalizando siga as instruções fornecida.

**Observação**: É permitido criar um projeto por meio de uma interface utilizando o comando ```$ vue ui```


## Estrutura projeto
Durante a minha caminhada com **Vue.js** pude obter diversar formas de estruturar os projetos permitindo uma melhor **manutenibilidade** e **legibilidade** do código e arquivos.

Vale ressaltar que esta estrutura é um padrão que eu utilizo e não um padrão obrigatório.

Os projetos que desenvolvo sempre utilizam Vue, Vue Router, Vuex, Teste Unitário e E2E Nightwatch.

```js
nome_projeto/
├── public/
│   ├── img/
│   │   └── icons/
│   │       ├── android-chrome-192x192.png
│   │       ├── android-chrome-512x512.png
│   │       ├── apple-touch-icon.png
│   │       ├── apple-touch-icon-60x60.png
│   │       ├── apple-touch-icon-76x76.png
│   │       ├── apple-touch-icon-120x120.png
│   │       ├── apple-touch-icon-152x152.png
│   │       ├── apple-touch-icon-180x180.png
│   │       ├── favicon-16x16.png
│   │       ├── favicon-32x32.png
│   │       ├── msapplication-icon-144x144.png
│   │       ├── mstile-150x150.png
│   │       └── safari-pinned-tab.svg
│   ├── _redirects
│   ├── browserconfig.xml
│   ├── crossdomain.xml
│   ├── favicon.ico
│   ├── humans.txt
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── img.png
│   ├── components/
│   │   ├── fragments/
│   │   │   ├── FileFragmentOneCpFgm.vue
│   │   │   └── FileFragmentTwoCpFgm.vue
│   │   └── layout
│   │       └── FileLayoutOneCpLyt.vue
│   │       └── FileLayoutTwoCpLyt.vue
│   ├── directives/
│   │   └── index.js
│   ├── locales/
│   │   └── en.json
│   │   └── pt-BR.json
│   ├── mixins/
│   │   └── index.js
│   ├── plugins/
│   │   ├── file-plugin-one.js
│   │   └── file-plugin-two.js
│   ├── scss/
│   │   ├── abstracts/
│   │   │   ├── _functions.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _variables.scss
│   │   │   └── glob.scss
│   │   ├── base/
│   │   │   ├── _general.scss
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── glob.scss
│   │   ├── components/
│   │   │   ├── _buttons.scss
│   │   │   └── glob.scss
│   │   ├── layout/
│   │   │   ├── _footer.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _grid.scss
│   │   │   ├── _header.scss
│   │   │   ├── _navigation.scss
│   │   │   ├── _sidebar.scss
│   │   │   └── glob.scss
│   │   ├── pages/
│   │   │   ├── _about.scss
│   │   │   ├── _contact.scss
│   │   │   ├── _home.scss
│   │   │   └── glob.scss
│   │   ├── themes/
│   │   │   ├── _admin.scss
│   │   │   ├── _theme.scss
│   │   │   └── glob.scss
│   │   ├── vendors/
│   │   │   ├── _bootstrap.scss
│   │   │   ├── _jquery-ui.scss
│   │   │   └── glob.scss
│   │   └── main.scss
│   ├── searches/
│   │   └── index.js
│   ├── store/
│   │   ├── modules/
│   │   │   ├── moduleone/
│   │   │   │   ├── actions.js
│   │   │   │   ├── getters.js
│   │   │   │   ├── index.js
│   │   │   │   ├── mutations.js
│   │   │   │   └── state.js
│   │   │   └── moduletwo/
│   │   │       ├── actions.js
│   │   │       ├── getters.js
│   │   │       ├── index.js
│   │   │       ├── mutations.js
│   │   │       └── state.js
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── mutations.js
│   │   └── state.js
│   ├── views/
│   │   ├── erros/
│   │   │   └── Error404.vue
│   │   ├── moduleOne/
│   │   │   ├── FileOnePageVw.vue
│   │   │   └── FileTwoPageVw.vue
│   │   ├── moduleTwo/
│   │   │   ├── FileOnePageVw.vue
│   │   │   └── FileTwoPageVw.vue
│   │   ├── FileOnePageVw.vue
│   │   └── FileTwoPageVw.vue
│   ├── App.vue
│   ├── i18n.js
│   ├── main.js
│   ├── router.js
│   ├── registerServiceWorker.js
│   └── service-worker.js
├── tests/
│   ├── e2e/
│   │   ├── custom-assertions/
│   │   ├── reports/
│   │   └── specs/
│   │       └── fileComponentName.js
│   └── unit/
│       └── fileComponentName.spec.js
├── .env.development
├── .env.production
├── .editorconfig
├── .browserslistrc
├── .gitignore
├── server.js
├── vue.config.js
├── package.json
└── README.md
```

Explicação:

- ```README.md``` Arquivo de descrição do projeto
- ```package.json``` Arquivo de configuração do projeto
- ```.gitignore``` Arquivo de configuração do Git
- ```.editorconfig``` Arquivo de configuração da IDE (Veja mais [aqui](https://editorconfig.org "EditorConfig"))
- ```.env.development``` Arquivo para alocar as variaveis de ambiente local
- ```.env.production``` Arquivo para alocar as variaveis de ambiente de produção (usado no build)
- ```.browserslistrc``` Arquivo onde especificamos quais navegadores suportamos diminuindo os arquivos de configuração no diretório do projeto
- ```server.js``` Arquivo de configuração de um servidor básico para servir o projeto em produção e não obter erro 404 já que ele não é um **SSR**
- ```vue.config.js``` Arquivo de configuração do vue, dificilmente se altera este arquivo
- ```tests``` Localização dos arquivos de testes
  - ```tests > e2e``` Arquivos de configuração dos testes Nightwatch
    - ```tests > e2e > custom-assertions``` Localização dos scripts de teste visual do Nightwatch
    - ```tests > e2e > reports``` Localização dos relatórios gerados pelos testes
    - ```tests > e2e > specs``` Localização dos scripts de teste unitários do Nightwatch
  - ```tests > unit``` Arquivos de configuração dos testes unitários
- ```public``` Localização dos arquivos públicos (Favicons, Index.html, Img's, CSS's, Javascript's, Jquery, ...)
  - ```img``` Localização das imagens publicas sem processamento (diferente das localizados no assets)
    - ```icons``` Localização dos icones usados pelos navegadores ao salvar uma página na area de trabalho, favicons e afins. Os descritos mais acima são os mais usados no geral **(Meu ponto de vista)**
  - ```_redirects``` Arquivo usado para servir o projeto no [Netlify](http://netlify.com), esta plataforma não utiliza o **server.js** e sim este arquivo
  - ```browserconfig.xml``` Arquivo de configuração do browser
  - ```crossdomain.xml``` Arquivo de configuração de cross domain
  - ```favicon.ico``` Favicon padrão no formato .ico
  - ```humans.txt``` Arquivo de agradecimentos, descritivo da aplicação e da equipe do prejeto
  - ```index.html``` Arquivo raiz da aplicação
  - ```manifest.json``` Arquivo de configuração do PWA
  - ```robots.txt``` Arquivo de configuração para os bots
  - ```sitemap.xml``` Arquivo de configuração do sitemap
- ```src``` Arquivos do projeto
  - ```assets``` Localização dos arquivos ativos, ao serem processados terão a mesma URL desde que o conteúdo seja o mesmo, aproveitando também o cache do navegador (Favicons, Img's, CSS's, Javascript's, Jquery, ...)
  - ```components``` Localização dos componentes, eu costumo separar no mínimo ___fragments___ e ____layout___
    - ```fragments``` Localização dos fragmentos da página (Botão, Tabela, Input, ...)
    - ```layout``` Localização dos layout's das páginas (Menu, Rodapé, Menu Lateral, ...)
  - ```diretives``` Localização das diretivas personalizadas
  - ```locales``` Localização dos arquivos de tradução
  - ```mixins``` Localização dos mixins
  - ```plugins``` Localização dos plugins de terceiros ou não (Bootstrap, Apollo, Vue Router, Vuex, ...). Vue Router e Vuex eu não costumo configurar neste diretório, mas segue como exemplo para saber o que poder ser configurado aqui.
  - ```scss``` Localização de todos os arquivos sass
  - ```searches``` Localização das consultas as API's
  - ```store``` Localização de toda a loja da aplicação, se existir modulos no projeto as suas lojas ficam separadas em diretórios identificados pelo nome do modulo a que se refere e separados da loja principal do projeto que fica solto neste diretório.
    - ```actions.js``` Arquivo de configuração das ações
    - ```getters.js``` Arquivo de configuração dos getters
    - ```index.js``` Arquivo utilizado para vincular todos os arquivos deste diretório e os arquivos index das lojas dos modulos
    - ```mutations.js``` Arquivo de configuração das mutações 
    - ```state.js``` Arquivo de configuração dos states    
  - ```views``` Localização dos arquivos que representam as páginas do projeto
  - ```i18n.js``` Arquivo de configuração do plugin i18n
  - ```App.vue``` Componente principal da aplicação
  - ```main.js``` Arquivo de inicialização da aplicação
  - ```router.js``` Arquivo de configuração das rotas
  - ```registerServiceWorker.js``` Arquivo de registro dos trabalhadores do PWA
  - ```service-worker.js``` Arquivo de configuração das dos trabalhadores do PWA