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

// Modules
// Importando os módulos
import ModuleXpz from './modules/xpz'
import ModuleAbc from './modules/abc'

// Components
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

Para que você possa entender, digamos que tenhamos um método/função chamado ```calc``` e queremos usar ele em dois componentes diferentes e que nao possuem relação um com o outro.

A forma que fariamos se não fossem os mixins seria para poder usar este método/função nos dois componentes seria criar ela em um componente e depois que estiver funcionando copiar e colar no outro componente. Desta forma temos um trabalho dobrado de criação e manutenção, fora que temos linhas repetidas.

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

```js
export const myMixins {
  computed: {
    // ...
  }
  // ...
}
```