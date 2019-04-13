# Configuração

Vou listar as configurações dos arquivos da estrutura anterior.

## App.vue
```vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
</style>
```


## main.js
```js
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { myMixins } from './mixins'

// Plugins
// import './plugins/file-plugin-name'

Vue.mixin(myMixins)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```


## router.js
```js
import Vue from 'vue'
import Router from 'vue-router'

// Carregamento assíncrono
const FileOnePageVw = () => import('@/views/FileOnePageVw')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FileOnePageVw
    }
  ]
})
```


## 404
Para definir uma rota de **404** basta alterar o arquivo __main.js__ e criar em __src/views/errors__ uma view de erro com o nome **404.vue**.

```js
import Vue from 'vue'
import Router from 'vue-router'

// Carregamento assíncrono
const FileOnePageVw = () => import('@/views/FileOnePageVw')

// Pagina de erro 404
const Error404 = () => import('@/views/errors/404')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FileOnePageVw
    },
    {
      path: '*',
      name: 'Error404',
      component: Error404
    }
  ]
})
```


## .Vue
> AlgumaCoisa.vue (Componentes, Fragmentos, Layout e Views)
```vue
<template>
  <!-- HTML -->
</template>
<script>
  // JavaScript
</script>
<style scoped lang="scss">
  /**
   ** CSS
   **/
</style>
```


## Plugins
>*Para este exemplo estou usando a configuração feita pelo próprio ___Vue Cli 3___ para o plugin [bootstrap-vue](https://bootstrap-vue.js.org "Plugin Bootstrap Vue") por ser da forma que utilizo e que fica muito mais organizado*

Criei um novo arquivo com este código:

```js
import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
```

Salvei com o nome ```plugin-x.js``` e depois importei no **mais.js**:

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { myMixins } from './mixins'

// Plugins
import '@/plugins/plugin-x'

Vue.config.productionTip = false

Vue.mixin(myMixins)

new Vue({
  ...
}).$mount('#app')
```
Desta forma o Bootstrap já está disponível de forma global em toda a aplicação.

Se não for para ser importado **globalmente** e sim em um **componente** específico, ao invés de importar no ```main.js``` importe dentro do ```<script></script>``` dos componentes desejado.

```vue
<template>
  ...
</template>

<script>
  import '@/plugins/plugin-x'

  export default {
    name: 'ComponenteX'
  }
</script>

<style scoped lang="scss">
  ...
</style>
```


## Store
Dentro do diretório **store** eu costumo separar as *lojas* da aplicação das dos *módulos*.

Os módulos são separados em diretórios dentro do diretório **modules** que se encontra em **store**, ficou meio confuso mas vou deixar exemplos.

Seguindo esta estrutura:

```js
nome_projeto/
└── src/
    └── store/
        ├── modules/
        │   ├── xpz/
        │   │   ├── actions.js
        │   │   ├── getters.js
        │   │   ├── index.js
        │   │   ├── mutations.js
        │   │   └── state.js
        │   └── abc/
        │       ├── actions.js
        │       ├── getters.js
        │       ├── index.js
        │       ├── mutations.js
        │       └── state.js
        ├── actions.js
        ├── getters.js
        ├── index.js
        ├── mutations.js
        └── state.js
```

Criei dois módulos de teste (**xpz** e **abc**) que representam o diretório com os mesmos nomes localizados em **views**, os arquivos dos módulos são basicamente os mesmos que estão na raiz da **store**, a unica diferença fica dentro do arquivo ```index.js``` nos módulos.

#### index.js (store)
```js
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// Store Modules
// Importando os módulos
import ModuleXpz from './modules/xpz'
import ModuleAbc from './modules/abc'

// Store Components
// import CompX from '@/components/fragments/x/store'

Vue.use(Vuex)

// Usando os módulos
const modules = {
  ModuleXpz,
  ModuleAbc
}

export default new Vuex.Store({
  strict: true,
  state,
  actions,
  mutations,
  getters,
  modules // Chamando os módulos
})
```
#### index.js (módulo)
```js
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  strict: true,
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
```

Agora a ___store dos módulos___ estão separados da ___store da aplicação___, se no futuro um módulo **X** não fizer mais parte da aplicação fica mais fácil desvincular a sua store já que está separada.

O conteúdo da store raiz e dos módulos seguem a mesma estrutura:
- **State**
  ```js
  // state.js

  export default {
    // Como se fosse o data do componente
    nomeVariavel: valor
  }
  ```
- **Getters**
  ```js
  // getters.js

  export default {
    'nomeGetter' (state) {
      return state.nomeStateQueEleRetorna
    }
  }
  ```
- **Mutations**
  ```js
  // mutations.js
  
  export default {
    'ACAO_NOMESTATE' (state, payload) {
      state.nomeStateQueEleManipula = payload
    }
  }
  ```
- **Actions**
  ```js
  // actions.js
  
  export default {
    mesmoNomeDaMutation (context, payload) {
      context.commit('NOME_MUTATION', payload)
    }
  }
  ```


## Módulos
Organizar a aplicação em módulos é a forma mais correta de organização ___(meu ponto de vista)___ , visto que para ter o coração da aplicação separado dos seus orgãos é vital para uma melhor **manutenibilidade**.

Para entender o que seria o coração e os orgãos (módulos) da aplicação, vamos tomar como base a seguinte situação:

*Temos uma aplicação com um sistema **admin** para uma **loja** com as seguintes funções principais, cadastrar produtos e efetuar vendas sem ter que relacionar os clientes. Digamos que no futuro vamos querer fazer um cadastro de clientes, onde vamos ter varias páginas que nos permita manipilar os usuário, logo podemos modularizar esta parte de cliente desta forma:*

```js
nome_projeto/
├── public/
├── src/
│   ├── store/
│   │   ├── modules/
│   │   │   └── clientes/
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
│   │   ├── clientes/
│   │   │   ├── CadastroClientePagina.vue
│   │   │   └── EditarClientePagina.vue
│   │   ├── CadastraProdutosPagina.vue
│   │   ├── EditarProdutosPagina.vue
│   │   ├── ListaProdutosPagina.vue
│   │   ├── CarrinhoComprasPagina.vue
│   │   ├── PedidoVendasPagina.vue
│   │   ├── PaginaPrincipal.vue
│   │   └── Login.vue
│   ├── App.vue
│   ├── main.js
│   └── router.js
└── README.md
```

___Observação:___ Os nomes das views são apenas para um melhor entendimento, criar nomes mais bonitos e concisos também é uma forma de organização.

Se observarmos podemos ver que a store deste módulo também está separado da store da aplicação, conforme informei [aqui acima](#store "Conteúdo de Store").

## Mixins
São nada mais nada menos que ___computeds, filters, hooks, methods, watchs e ...___ compartilhados e visíveis por toda a aplicação.

Para que você possa entender, digamos que tenhamos um método/função chamado ```calc``` e queremos usar ele em dois componentes diferentes e que não possuem relação um com o outro.

A forma que fariamos se não fossem os mixins poder usar este método/função nos dois componentes seria criar ela em um componente e depois que estiver funcionando copiar e colar no outro componente. Desta forma temos um trabalho dobrado de criação e manutenção, fora que temos linhas repetidas.

Neste ponto que entram os **mixins**, com eles podemos criar o método/função em apenas um lugar e chama-lo onde quisermos.

Antes de mostrar este exemplo, precisamos ver como importamos, onde criamos os arquivos e seus conteúdos.


#### Importação

Para importar devemos definir no arquivo ```main.js``` onde se encontra o arquivo que vincula todos os mixins e configurar na instância do **Vue.js**.
```js
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { myMixins } from '@/mixins' // Importando os Mixins

Vue.config.productionTip = false

// Usando os Mixins
Vue.mixin(myMixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
#### Estrutura

A estrutura onde se sencontram os mixins é esta:

```js
nome_projeto/
├── src/
│   ├── assets/
│   ├── components/
│   ├── mixins/
│   │   └── index.js
│   ├── plugins/
│   ├── store/
│   ├── views/
│   ├── App.vue
│   ├── main.js
│   └── router.js
└── README.md
```

Onde temos os seguinte arquivo:
- ```index.js```: Este arquivo é utilizado para importar e exportar todos os mixins

**Obs:** Os metodos contidos aqui são os que eu costumo usar nos meus projetos.

```js
export const myMixins {
  computed: {
  },
  filters: {
  },
  watch: {
  },
  .
  .
  .
  methods: {
    isReallyArray (value) {
      if (Array.isArray(value)) {
        return true
      } else {
        return false
      }
    },
    hasProperty (objSearch, valueSearch) {
      if (typeof (objSearch[valueSearch]) !== 'undefined') {
        return true
      } else {
        return false
      }
    },
    isReallyString (value) {
      if (typeof value === 'string') {
        return true
      } else {
        return false
      }
    },
    inArray (arraySearch, value) {
      let result = arraySearch.indexOf(value)
      if (result === -1) {
        return false
      } else {
        return true
      }
    },
    has (value, key) {
      if (value[key] !== key) {
        return true
      }
    },
    isReallyEmpty (value) {
      if (value === null) {
        return true
      }

      if (this.isReallyArray(value) || this.isReallyString(value)) {
        return value.length === 0
      }

      for (let key in value) {
        if (this.has(value, key)) {
          return false
        }
      }

      return true
    }
  },
  filters: {
    textUpperCase (string) {
      return string.toUpperCase()
    },
    textCapitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
```

## SASS
Comece criando um arquivo chamado ```vue.config.js``` na raiz do projeto para configurar o sass e um diretório chamado *scss* no diretório *src* com os seguintes arquivos.

>Vale ressaltar que os arquivos (exceto os glob.scss) dos diretórios ___components___, ___layout___, ___pages___, ___themes___ e ___vendor___ são para ilustrar os tipos de arquivos que você vai disponibilizar em cada diretório. Os dos diretórios ___abstracts___ e ___base___ são obrigatórios pois você vai precisar para configurar em todos os projetos, caso não, edite conforme necessitar.

```js
nome_projeto/
├── src/
│   ├── assets/
│   ├── components/
│   ├── mixins/
│   ├── plugins/
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
│   ├── store/
│   ├── views/
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── vue.config.js
└── README.md
```

Sempre que for criar um arquivo novo comece com um underline *_* antes do nome (_button.scss, _card.scss, ...).

#### vue.config.js
```js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/scss/main.scss";`
      }
    }
  }
}
```

#### main.scss
```scss
// File: main.scss
// This file contains all imports
@import 'abstracts/glob';
@import 'vendors/glob';
@import 'base/glob';
@import 'layout/glob';
@import 'components/glob';
@import 'pages/glob';
@import 'themes/glob';
```

Todos os arquvos (exceto os glob.scss) possuem este conteúdo padrão *+* a sua estilização:

#### _nomearquivo.scss
```scss
// File: _nomearquivo.scss
// This file contains all functions.
/* STYLES GO HERE */
.estilizacoes {

}
```

Podemos observar que temos o nome do arquivo no começo (sem o underline), uma descrição sobre os conteúdo do arquivo, um comentário e logo depois você pode começar a estilizar.

O *glob* por sua vez recebe a importação dos arquivos onde ele esta localizado, então se ele etiver no diretório que guarda os arquivos de componentes ele vai importar os arquivos que forem ser criados.

#### glob.scss
```scss
// File: glob.scss
// This file contains all imports
@import 'components/button';
@import 'components/card';
```

Na importação não precisamos informar o underline e nem a extensão dos arquivos *.scss*.

Agora as estilizações que forem sendo criadas estarão disponíveis globalmente na aplicação, sem a necessidade de termos que importar toda vez nos componentes e afins. Podemos acessar variáveis, funções, mixins, ...