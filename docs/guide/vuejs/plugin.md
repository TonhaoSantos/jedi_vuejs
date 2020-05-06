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

A estrutura de um componente é esta:

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




