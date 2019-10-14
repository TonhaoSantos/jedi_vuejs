
```js


// import Sortable from 'sortablejs'
// Diretiva personalizada vuejs
Vue.directive('example', {
  params: ['a'],
  bind: function () {
    console.log(this) // -> "hi"
  }
})



<p>Diretiva</p>
<div v-example="a"></div>






<div v-example a="hi"></div>
Vue.directive('example', {
  params: ['a'],
  bind: function () {
    console.log(this.params.a) // -> "hi"
  }
})












// Sem passar valor (Um exemplo seria o else)
<app-navigation v-sticky></app-navigation>

// Passando valor para a directive (Uma variavel/data)
<app-navigation v-sticky="isVisible"></app-navigation>

// Recebendo string
<app-navigation v-sticky="'red'"></app-navigation>

// Passando um argumento (recebe apenas um argumento)
<app-navigation v-sticky:bottom></app-navigation>

// Modificadores (Pode receber varios modificadores)
<span v-format.underline>guide</span>
<span v-format.bold.highlight.underline>guide</span>   // texto será negrito, realçado e terá um sublinhado







// Criando uma diretiva de nome fixo
Vue.directive('nome')

// usando
<app-navigation v-nome></app-navigation>




// Hooks
bind  - isso ocorre uma vez quando a diretiva é anexada ao elemento.
inserted  - isso ocorre quando o elemento é inserido no DOM pai
update  - isso ocorre quando o elemento é atualizado, mas as crianças ainda não foram atualizadas
componentUpdated  - isso ocorre quando o componente e os filhos foram atualizados
unbind  - isto ocorre quando a diretiva é removida

// Cada um desses tem el , binding e vnode argumentos disponíveis para eles. Esses argumentos são:
el  - o elemento em que a ligação está
binding  - um objeto que contém os argumentos que são passados ​​para os ganchos. Existem muitos argumentos disponíveis, incluindo name, value, oldValue, expression, arg e modifiers.
vnode  - permite referir-se diretamente ao nó no DOM virtual, se necessário. Tanto a ligação quanto o vnode devem ser tratados como somente leitura.
update e componentUpdated ambos expõem um argumento adicional chamado oldvnode. O argumento oldvnode é usado para diferenciar entre o valor mais antigo passado e o valor mais recente. Vincular e atualizar são os mais úteis dos cinco.







// Deixa o componente fixo na tela
// <app-navigation v-sticky></app-navigation>
Vue.directive('sticky', 
    function(el, binding, vnode) {
        el.style.position = 'fixed';
    }
))

// Define a cor do texto para laranja
// <h1 v-orange>Ola mundo</h1>
Vue.directive("orange", function(el, binding, vnode) {
    el.style.color = "orange";
})

// Passando uma cor para a diretiva
// <h1 v-color="'red'">{{ msg }}</h1>
// <h1 v-color="'blue'">{{ msg }}</h1>
// <h1 v-color="'#ffff00'">{{ msg }}</h1>
Vue.directive("color", function(el, binding, vnode) {
    el.style.color = binding.value;
})

// Passando argumento para definir se vai ficar fixo no top ou bottom da tela. Se não for passado nada vai ser no top
// (top) <app-navigation v-sticky></app-navigation>
// (bottom) <app-navigation v-sticky:bottom></app-navigation>
Vue.directive("sticky", function(el, binding, vnode) {
  const loc = binding.arg === "bottom" ? "bottom" : "top";
  el.style.position = "fixed";
  el.style[loc] = 0;
  if (loc === "bottom") {
    el.style.background = "burlywood";
  } else {
    el.style.background = "#7e7e7e";
  }
})

// Modificadores
// <span v-format.underline>guide</span>
// <span v-format.bold>configure / customize</span>
// <span v-format.highlight>check out</span>
// <h3 v-format.highlight.bold.underline>Installed CLI Plugins</h3>
Vue.directive("format", function(el, binding, vnode) {
  const modifiers = binding.modifiers;
  if (modifiers.underline) {
    el.style.textDecoration = "underline";
  }
  if (modifiers.bold) {
    el.style.fontWeight = "bold";
  }
  if (modifiers.highlight) {
    el.style.background = "#ffff00";
  }
})



// Hooks em ação
/*
<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div v-hook-demo>{{ count }}</div>
    <button @click="++count;">Update</button>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      count: 0
    }
  }
}
</script>
*/

Vue.directive("hook-demo", {
  bind(el, binding, vnode) {
    console.log("bind");
  },
  inserted(el, binding, vndoe) {
    console.log("inserted");
  },
  updated(el, binding, vnode) {
    console.log("updated");
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    console.log("componentUpdated");
  }
})















Vue.directive('phone', {
  bind (el, binding, vnode) {
    console.log('bind')
    console.log('bd elemento: ', el)
    console.log('bd binding: ', binding)
    console.log('bd valor: ', vnode)
    const modifiers = binding.modifiers

    if (modifiers.mask) {
      el.mask('####-####', { placeholder: '0000-0000' })
      el.change(function () {
        let value = this.val()
        el.set(value)
      })
    }
  },
  update (el, binding, vnode) {
    console.log('update')
    console.log('up elemento: ', el)
    console.log('up binding: ', binding)
    console.log('up valor: ', vnode)
    const modifiers = binding.modifiers

    if (modifiers.mask) {
      el.mask('####-####', { placeholder: '0000-0000' })
      el.change(function () {
        let value = this.val()
        el.set(value)
      })
    }
  }
})


Vue.directive('date', {
    'twoWay': true,
    'bind': function () {
        var self = this

        self.mask = "99/99/9999"
        $(self.el).mask(self.mask, { placeholder:"MM/DD/YYYY" })
        $(self.el).change(function() {
            var value = $(this).val()
            self.set(value)
        })
    },
    'unbind': function () {
        var self = this

        $(self.el).unmask(self.mask)
    }
})
```