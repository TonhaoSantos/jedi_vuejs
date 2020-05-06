# Plugin
> Maneira de conectar recursos globais a um aplicativo e estendê-los para nosso uso

## Usar um plugin

Algumas categorias que os plugins se enquadram são:
- Adicionar alguns métodos ou propriedades globais.
- Adicionar um ou mais ativos globais: **diretivas**, **filtros**,***transições** e outros.
- Adicionar algumas opções de componentes por mixin global.
- Adicionar alguns métodos de instância do Vue anexando-os ao Vue.prototype.
- Uma biblioteca que fornece uma API própria, ao mesmo tempo em que injeta alguma combinação dos itens acima.

Para criar plugins precisamos definir o diretorio onde vamos centralizar eles.

Eu costumo criar dentro de **src** um diretorio chamado **plugins** onde instalo meus plugins e os de terceiros.

Um **plugin Vue** é basicamente um objeto com uma funcao **install** que é executada sempre que o aplicativo que o utiliza o inclui em ```vue.use()```.

Um **plugin** deve conter um metodo **install** que aceita dois parâmetros:
- O objeto/construtor global **Vue**
- Um objeto opcional chamado **options** que serve para customizar o plugin com opcoes fornecidas pelos usuarios


Entao para usarmos um plugin, no **main.js** importamos ele e depois usamos com o **vue.use()**.

```js
import Vue from 'vue'
...
import PluginX from '@/plugins/plugin-x'

Vue.use(PluginX)

new Vue({
  ...
}).$mount('#app')
```

Ou passando parametros se o componente permitir

```js
import Vue from 'vue'
...
import PluginX from '@/plugins/plugin-x'

Vue.use(PluginX, {
    algumaOpcao: true
})

new Vue({
  ...
}).$mount('#app')
```


## Criar um plugin
> Documentacao [AQUI](https://cli.vuejs.org/guide/build-targets.html#library)

Para criar um plugin de maneira facil basta usar o vue cli e criar um projeto com configuracao default (basico).

Para instalar o @vue/cli globalmente

```js
yarn global add @vue/cli
```

Depois é só criar um projeto basico
```js
vue create plugin-button
```

```js
Vue CLI v4.3.1
? Please pick a preset: (Use arrow keys)
❯ default (babel, eslint) 
  Manually select features 
```

Espera terminar de criar o projeto e inicie o mesmo

```js
yarn serve
```

Vamos fazer algumas mudancas

Indo no ```package.json```, inclua um o build-lib script:
```js
vue-cli-service build --target lib --inline-vue --name nome-plugin [entry]
```

Alterar o **nome-plugin** para o nome do seu projeto

Altere o **[entry]** para o arquivo que sera a entrada do plugin, neste caso o ```src/main.js```. Se nao informado, ficando **[entry]** será o ```src/App.vue```

O scripts no ```package.json``` ficou mais ou menos assim:
```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-lib": "vue-cli-service build --target lib --inline-vue --name plugin-button src/main.js",
    "lint": "vue-cli-service lint"
}
```

Se voce rodar ```yarn build-lib```vera isso:
```js
 DONE  Compiled successfully in 4866ms                                                                 2:14:44 PM

  File                             Size                 Gzipped

  dist/plugin-button.umd.min.js    70.49 KiB            25.14 KiB
  dist/plugin-button.umd.js        222.08 KiB           60.92 KiB
  dist/plugin-button.common.js     221.69 KiB           60.81 KiB
  dist/plugin-button.css           0.33 KiB             0.23 KiB

  Images and other types of assets omitted.

✨  Done in 7.16s.
```

O resultado retornado Significa que a construção foi bem-sucedida.

Se olharmos para a pasta dist podemos ver varios arquivos, precisamos definir qual arquivo vai ser usado por qualquer aplicativo que importe nosso plugin.

Vamos escolher o terminado com ```.common.js````

Indo no ```package.json``` adicione o a sessao main:
```js
"main": "./dist/plugin-button.common.js"
```

Ficando assim:
```js
"main": "./dist/plugin-button.common.js",
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "build-lib": "vue-cli-service build --target lib --inline-vue --name plugin-button src/main.js",
    "lint": "vue-cli-service lint"
}
```

Para exemplo, vamos seguir criando um plugin de botao.

Indo na pasta **components** crie um componente chamado ```SimpleButton.vue``` e coloque este conteudo

```html
<template>
  <div>
    <button @click="incremento">{{ texto }}</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contador: 0
    }
  },
  computed: {
    vezes () {
      return this.contador === 1 ? 'vez' : 'vezes'
    },
    texto () {
      return `Clicado ${this.contador} ${this.vezes}`
    }
  },
  methods: {
    incremento () {
      this.contador += 1
    }
  }
}
</script>
```

O vue nos permite ver este componente funcionando, rode o seguinte:

```js
vue serve src/components/SimpleButton.vue
```

Ao abrir o navegador podemos testar o botao.

Agora para que possamos usar este plugin em outros lugares temos que informar o que sera exportado.

Indo no ```main.js``` e apagando tudo que contem nele, cole o seguinte

```js
import SimpleButton from './components/SimpleButton.vue'

export default SimpleButton
```

Não esqueca de fazer o rebuild sempre que terminar de atualizar alguma coisa

Se compartilhamos este projeto sem publicar no NPM/YARN, podemos fazer a instalacao de um pacote local com o yarn

Estando em outro projeto podemos fazer assim
```js
yarn add ../plugin-button
```

Para usar por exemplo no ```APP.vue``` de um outro projeto
```js
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <simple-button />
  </div>
</template>
<script>
import SimpleButton from 'plugin-button'

export default {
  name: 'app',
  components: {
    SimpleButton
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Se rodar seu projeto poderar testar o plugin
```js
yarn serve
```

Caso o seu plugin precise trabalhar com vuex, devemos lembrar que o vue só permite apenas uma instancia do vuex. 

Para usar a nossa store precisamos apenas definir a estrutura dela e informar que nosso projeto depende do vuex instalado no projeto.

Para usarmos, primeiro precisamos criar a estrutura da store, se voce usa em um arquivo unico OK, se usa modular OK, precisamos apenas do caminho depois.

Vou criar aqui um arquivo chamado ```store.js``` na raiz do plugin com este conteudo

```js
const store = {
  state: {
    contador: 0
  },
  getters: {
    contador: state => state.contador
  },
  mutations: {
    increment (state) {
      state.contador += 1
    }
  }
}
export default store
```

Atualize o plugin ```SimpleButton.vue``` com este conteudo

```html
<template>
  <div>
    <button @click="incremento">{{ texto }}</button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    vezes () {
      return this.$store.getters.contador === 1 ? 'vez' : 'vezes'
    },
    texto () {
      return `Clicado ${this.$store.getters.counter} ${this.vezes}`
    }
  },
  methods: {
    incremento () {
      this.$store.commit('increment')
    }
  }
}
</script>
```

Precisamos atualizar o main.js do plugin para isso
```js
import SimpleButton from './components/SimpleButton.vue'

import store from './store.js'

export default {
  install (Vue, options) {
    // Precisamos que vuex seja passada como opcao para que possamos registrar a vuex do plugin
    if (!options || !options.store) {
      throw new Error('Please initialise plugin with a Vuex store.')
    }
    
    options.store.registerModule('simplebutton', store)
 
    Vue.component('simple-button', SimpleButton)
  }
}
```

Precisamos fazer pois exportar nao era o suficiente, precisavamos torna-lo um plugin

Agora podemos usar ele assim no main.js do projeto que queremos ele
```js
import DummyButton from 'dummylib';

Vue.use (MyPlugin, {someOption: someValue})

// ou
Vue.use(DummyButton);
```

Esta segunda forma é para quando o plugin nao precisa de opcoes para funcionar, no caso deste plugin que criamos ele precisa, entao usariamos o primeiro ```Vue.use```

```js
import DummyButton from 'dummylib';

Vue.use (MyPlugin, {someOption: someValue})
```


A estrutura um pouco mais detalhada do que se pode fazer no ```install```de um plugin/componente vamos ver no decorrer, o install é assim:

```js
export default {
  install(vue, opts){   
    // Alguma coisa
  }
}
```

Quando construimos um plugin queremos que ele seja configurável, permitindo que qualquer pessoa que o use em seu próprio aplicativo possa o aprimorar.

Fora que também queremos torna nosso plug-in mais versátil.

Para recebermos os opcoes podemos fazer assim:

```js
export default {
  install(Vue, options) {
    const { job = "" } = options || {};
  }
};
```

Neste exemplo estamos desconstruindo 0 **options** para o que realmente recebemos, desta forma evitamos receber alguma coisa que não queremos no nosso plugin.

Setei como vazio para os casos em que a opcao não é setada evitando erros internos em locais que precisaremos desta propriedade.

Exemplo de plugin:

```js
import ComponentX from "@/components/Component.vue";
import ComponentY from "@/components/Component.vue";

import AnnoyingBackground from "@/components/aaa";

const Components = {
  "component-plugin": ComponentX,
  ComponentY
};

const Directives = {
  "annoying-background": AnnoyingBackground
};

export default {
  // The install method will be called with the Vue constructor as the first argument, along with possible options
  install(Vue, options) {
    // se a opcao job nao for passada sera definida como vazio
    // se options nao for passado vai ser definido como vazio
    const { job = "", car = "" } = options || {};




    
    // Adicione a instância do vue componentes
    Object.keys(Components).forEach(name => {
      Vue.component(name, Components[name]);
    });





    // Adicione a instância do vue componentes
    Object.keys(Directives).forEach(name => {
      Vue.directive(name, Directives[name]);
    });





    // Injetanco Mixin
    Vue.mixin({
      // Created lifecycle hooks
      created() {
        console.log("Hello from created hook plugin!");
      }
    });





    Vue.filter("capitalize", function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    });




    // Quando usado o prototype o que esta sendo disponibilizado vai estar disponivel desde de o beforeCreate da instancia Vue
    // Adicione a instância  do vue o método $myInfo=
    Vue.prototype.$myInfo = (name, age) => mensagem(name, age, job, car);
    
    // Adicione a instância do vue a variavel $surname
    Vue.prototype.$surname = "Smith";




    // Adicione metodos globais
    Vue.metodoGlobal = function() {
      // Faz alguma logica
    };

    // Adicione propriedades globais
    Vue.propriedadeGlobal = "Alguma coisa";
  }
};

// Retorna uma string
const mensagem = (name = "John", age = 22, job = "student", car = "") =>
  `My name is ${name} and I am a ${age} years old ${job}. My car is ${car}.`;


// Para pessoas que usam seu plug-in fora de um sistema de módulos, geralmente é esperado que, se ele for incluído após a tag de script do Vue, ele se instale automaticamente sem a necessidade de chamar Vue.use ()
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MyPlugin)
}
```

No **main.js** posso chamar assim:

```js
import Vue from "vue";
import App from "./App.vue";
import PluginX from "@/plugins/nomePlugin";


// Nao passano opcao
Vue.use(PluginX);

// Passano opcao
Vue.use(PluginX, {
  job: "Web Dev"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
```


