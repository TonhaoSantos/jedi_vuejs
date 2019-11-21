# Inline

Eu não recomendo usar o modo **inline**, mas como nem todos os nosso projetos rodaram o **Vue** em _full project_.

Antes é preciso lembrar que existem duas alternativas de se definir templates, Inline e X-templates.

No *inline* o componente filho vai usar seu proprio conteudo como template:
```html
<my-component inline-template>
  <div>
    <p>Ola Mundo</p>
  </div>
</my-component>
```

No *x-template* definimos dentro de elementos scripts no html com o type _text/x-template_ e referenciamos por meio do id:
```html
<!doctype html>
<html lang="en">
  <head>
    ...
  </head>

  <body>
    <div id="my-app">
      <my-component></my-component>
    </div>


    <script type="text/x-template" id="my-component-template">
        <p>Olá</p>
    </script>
    <script>
        Vue.component("my-component", {
            "template": "#my-component-template"
        })
    </script>


    <script type="text/javascript">
      new Vue({
        el: '#my-app',
        components: {
          'my-component': httpVueLoader('/components/my-component.vue')
        }
      });
    </script>
  </body>
</html>
```

Mesmo tendo estas duas alternativas, procure sempre definir dentro do proprio componente:
```
Vue.component('my-component', {
    template: '<h3>Teste</h3>'
})
```

Eu costumo fazer de duas maneiras o inline.

## Primeira Maneira
Minha estrutura é a seguinte
```js
nome_projeto/
├── src/
│   ├── components/
│   │   └── ComponentX.vue
│   ├── assets
│   │   ├── css
│   │   │   └─── style.css
│   │   ├── js
│   │   │   └─── main.js
│   │   └── images/
│   └── index.html
├── server.js
└── package.json
```

No **package.json** costuma ter a seguinte configuração:
```js
{
  "name": "teste",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "dev": "node server.js"
  },
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

No **server.js** costuma ter a seguinte configuração:
```js
const express = require('express')
const port = 3000

app = express()

app.use(express.static('src'))

app.listen(port, () => {
    console.log(`app up on port: http://localhost:${port}`)
});
```

No **index.html** costuma ter a seguinte configuração:
```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/http-vue-loader@1.4.1/src/httpVueLoader.min.js"></script>
  </head>

  <body>
    <div id="my-app">
      <my-ola></my-ola>
      <my-component></my-component>
    </div>

    <script type="text/javascript">
      new Vue({
        el: '#my-app',
        components: {
          'my-ola': httpVueLoader('/components/hero.vue'),
          'my-component': httpVueLoader('/components/my-component.vue')
        }
      });
    </script>
  </body>
</html>
```

Nos componentes vão estrutura **vue** mesmo:
```vue
<template>
    <div class=""></div>
</template>

<script>
module.exports = {
    data: function() {
        return {
        }
    }
}
</script>

<style>
</style>
```




## Segunda Maneira
Minha estrutura é a seguinte
```js
nome_projeto/
├── src/
│   ├── assets
│   │   ├── css
│   │   │   └─── style.css
│   │   ├── js
│   │   │   └─── main.js
│   │   └── images/
│   └── index.html
├── server.js
└── package.json
```

No **package.json** costuma ter a seguinte configuração:
```js
{
  "name": "teste",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "dev": "node server.js"
  },
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

No **server.js** costuma ter a seguinte configuração:
```js
const express = require('express')
const port = 3000

app = express()

app.use(express.static('src'))

app.listen(port, () => {
    console.log(`app up on port: http://localhost:${port}`)
});
```

No **index.html** costuma ter a seguinte configuração:
```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/http-vue-loader@1.4.1/src/httpVueLoader.min.js"></script>
  </head>

  <body>
    <div id="my-app">
      <my-component inline-template>
        <h1>{{ name }}</h1>
      </my-component>

      <my-other-component></my-other-component>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script type="text/javascript">
      
    </script>
  </body>
</html>
```

No **main.js** costuma ter a seguinte configuração:
```js
// Global
Vue.component('my-component', {
    data() {
        return {
            name: 'Max'
        }
    }
})
Vue.component('my-other-component', {
    template: '<h3>Teste</h3>'
})


// Local
var ComponentX = {
    data() {
        return {
        }
    }
}
var ComponentY = {
    components: {
        'component-h': ComponentH
    }
    data() {
        return {
        }
    }
}
var ComponentH = {
    data() {
        return {
        }
    }
}

new Vue({
    el: '#my-app',
    components: {
        'componentX': ComponentX,
        'componentY': ComponentY
    }
});
```