# Rotas
Vue Router é o roteador oficial para Vue.js.

Ele se integra profundamente ao núcleo do Vue.js para facilitar a construção de aplicativos de página única com o Vue.js. 

Características incluem:
- Mapeamento de rota / visualização aninhada
- Configuração de roteador modular baseada em componente
- Rota params, consulta, curingas
- Veja os efeitos de transição acionados pelo sistema de transição do Vue.js
- Controle de navegação refinado
- Links com classes CSS ativas automáticas
- Modo de histórico de HTML5 ou modo de hash, com fallback automático no IE9
- Comportamento de rolagem personalizável

```js
// Obtem o vue-router ()
this.$router

// Obtem a rota atua
this.$route
```

Algumas formas possiveis de definir e chamar rotas
```js
import Vue from 'vue'
import Router from 'vue-router'

// Carregamento sincrono
import Error404 from '@/views/errors/Error404'
// Carregamento assincrono
const Home = () => import('@/views/Home')
const Contact = () => import('@/views/Contact')
const About = () => import('@/views/About')

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    
    if (to.hash) {
      position.selector = to.hash
      
      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }

      if (document.querySelector(to.hash)) {
        return position
      }
      
      return false
    }

    return new Promise(resolve => {
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
      }
      
      this.app.$root.$once('triggerScroll', () => {
        resolve(position)
      })
    })
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active', //Default
  linkExactActiveClass: 'router-link-exact-active', //Default
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      //Conteudo dinamico
      //Caminho -> /qualquercoisa/lucas/repoteste/396
      //Parametros -> {name: 'lucas', repo: 'repoteste', issue: 396}
      path: '/qualquercoisa:name/:repo/:issue',
      name: 'QualquerCoisa',
      component: QualquerCoisa,
    },
    {
      //Conteudo dinamico
      //Caminho -> /user/3
      //Parametros -> {id: 3}
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      //Conteudo dinamico
      //Caminho -> /user/evan
      //Parametros -> {username: 'evan'}
      path: '/user/:username',
      name: 'User',
      component: User
    },
    {
      //Conteudo dinamico
      //Caminho -> /user/:username / post /: post_id
      //Parametros -> {username: 'evan'}
      path: '/user/:username/post/: post_id',
      name: 'User',
      component: User
    },
    {
      //Rota asterisco
      //Inicie com user e termine com -qualquerCoisa
      path: '/user-*',
      name: 'QualquerCoisa',
      component: QualquerCoisa
    },
    {
      //Rota aninhada
      path: '/user/:id',
      name: 'QualquerCoisa',
      component: QualquerCoisa,
      children: [
        {
          // Aparece em um novo <router-view> dentro do componente pai
          // Pagina raiz para este componente, para quando nao tiver os irmãos de baixo
          // /user/:id/
          path: '',
          component: UserHome
        },
        {
          // Aparece em um novo <router-view> dentro do componente pai
          // /user/:id/profile
          path: 'profile',
          component: UserProfile
        },
        {
          // Aparece em um novo <router-view> dentro do componente pai
          // /user/:id/posts
          path: 'posts',
          component: UserPosts
        }
      ]
    },
    {
      path: '*',
      name: 'Error404',
      component: Error404
    },
    {
      // Exibição nomeada
      path: 'x',
      name: 'Error404',
      components: {
        default: compFoo,
        a: compBar,
        b: compBaz
      }
    },
    {
      // Exibição nomeada 2
      path: '/settings',
      name: 'UserSettings',
      component: UserSettings,
      children: [{
      	path: 'emails',
        component: UserEmailsSubscriptions
      }, {
      	path: 'profile',
        components: {
        	default: UserProfile,
          helper: UserProfilePreview
        }
      }]
    },
    {
      // Redirecionamento 1
      path: '/a',
      redirect: '/b'
    },
    {
      path: 'relative-redirect',
      redirect: 'foo'
    },
    { 
      // Redirecionamento por rota nomeada
      path: '/a',
      redirect: { name: 'foo' }
    },
    { 
      // Redirecionamento por função dinamica
      path: '/a',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      }
    },
    {
      //Redirecionamento com parametro
      path: '/redirect-with-params/:id',
      redirect: '/with-params/:id'
    },
    {
      //Alias
      // Um alias de /a como /b significa quando o usuário visita /b, o URL permanece /b,
      // mas será correspondido como se o usuário estivesse visitando /a.
      path: '/a',
      component: A,
      alias: '/b'
    },
    {
      //Alias
      path: '/root', component: Root, alias: '/root-alias'
    },
    {
      //Alias
      path: '/home', component: Home,
      children: [
        // absolute alias
        { path: 'foo', component: Foo, alias: '/foo' },
        // relative alias (alias to /home/bar-alias)
        { path: 'bar', component: Bar, alias: 'bar-alias' },
        // multiple aliases
        { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
        // default child route with empty string as alias.
        { path: 'default', component: Default, alias: '' },
        // nested alias
        { path: 'nested', component: Nested, alias: 'nested-alias',
          children: [
            { path: 'foo', component: NestedFoo }
          ]
        }
      ]
    },
    {
      // Passando Props para os Componentes de Rota
      // Desacoplando
      //Isso permite que você use o componente em qualquer lugar, o que torna o componente mais fácil de reutilizar e testar.
      path: '/user/:id',
      component: User
    },
    {
      // Passando Props para os Componentes de Rota
      // Modo booleano
      // Desacoplando
      //Isso permite que você use o componente em qualquer lugar, o que torna o componente mais fácil de reutilizar e testar.
      path: '/user/:id',
      component: User,
      props: true
    },
    {
      // Passando Props para os Componentes de Rota
      // Desacoplando
      //Isso permite que você use o componente em qualquer lugar, o que torna o componente mais fácil de reutilizar e testar.
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    },
    {
      // Passando Props para os Componentes de Rota
      // modo objeto
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    },
    {
      // Passando Props para os Componentes de Rota
      //modo função
      // O URL /search?q=vuepassaria {query: 'vue'}como adereços ao SearchUsercomponente
      path: '/search',
      component: SearchUser,
      props: (route) => ({ query: route.query.q })
    },
    {
      // Meta
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ],
  scrollBehavior
})
```

Chamar rotas
```html
<template>
  <div>
    <router-link to="/">Home</router-link>


    <router-link :to="{ name: 'Home', params: {} }">Home</router-link>


    <!-- literal string -->
    <router-link to="home">Home</router-link>
    <!-- renders to -->
    <a href="home">Home</a>

    <!-- javascript expression using `v-bind` -->
    <router-link v-bind:to="'home'">Home</router-link>

    <router-link to="/">Home</router-link>

    <!-- Omitting `v-bind` is fine, just as binding any other prop -->
    <router-link :to="'home'">Home</router-link>

    <!-- same as above -->
    <router-link :to="{ path: 'home' }">Home</router-link>

    <!-- named route -->
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

    <router-link :to="{ name: 'Home', params: {} }">Home</router-link>

    <router-link :to="{ name: 'About', params: {name: username} }">About</router-link>

    <router-link :to="{ name: 'Contact', params: {} }">Contact</router-link>

    <!-- with query, resulting in `/register?plan=private` -->
    <router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>


    <!--
      A configuração replaceprop chamará em router.replace()vez de router.push()quando clicada, portanto, a navegação não deixará um registro de histórico.
    -->
    <router-link :to="{ path: '/abc'}" replace></router-link>


    <!--
      Definir appendprop sempre anexa o caminho relativo ao caminho atual. Por exemplo, supondo que estamos navegando de /aum link relativo b, sem appendque acabemos chegando /b, mas com a appendqual terminaremos /a/b
     -->
    <router-link :to="{ path: 'relative/path'}" append></router-link>


    <!-- modo de correspondência exata -->
    <!-- Rota /a é diferente de /a/b -->
    <router-link :to="/a" exact></router-link>



    <!-- tornando o elemento de link em outro elemento (tag) -->
    <ul>
      <li>
        <router-link tag="li" :to="{ name: 'Home', params: {} }">
          <a>Home</a>
        </router-link>
      </li>

      <li>
        <router-link tag="li" :to="{ name: 'Home', params: {} }">
          <a>adsa</a>
        </router-link>
      </li>
    </ul>
    


    <!-- Imprimindo parametros -->
    {{ $route.params.id }}

    <!-- Imprimindo parametros com Desacoplando (esta sendo definido em props do componente) -->
    <div>User {{ id }}</div>



    <!-- Rota asterisco -->
    <!-- Imprime conteudo do asterisco -->
    {{ $route.params.pathMatch }}


    <!-- Rota programatica -->
    <!-- router.push(location, onComplete?, onAbort?) -->
    <!-- Ele age como router.push, a única diferença é que ele navega sem
         pressionar uma nova entrada de histórico, como o próprio nome
         sugere - ele substitui a entrada atual -->
    <button @click.prevent="rotaProgramatica2"></button>


    <!-- Rota programatica -->
    <!-- router.replace(location, onComplete?, onAbort?) -->
    <!-- <router-link :to="...">é o equivalente de chamar router.push(...) -->
    <button @click.prevent="rotaProgramatica"></button>


    <!-- Rota programatica -->
    <!-- router.go(n) -->
    <!-- Esse método usa um único inteiro como parâmetro que indica por quantos
         passos para avançar ou retroceder na pilha do histórico, semelhante
         a window.history.go(n) -->
    <button @click.prevent="rotaProgramatica"></button>









    <router-view/>
    <router-view></router-view>

    <!-- Exibição nomeada (Olha arquivo de rotas, pesquisar por "Exibição nomeada") -->
    <!-- Imprime todos ao mesmo tempo na mesma pagina -->
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>

    <!-- Exibição nomeada (Olha arquivo de rotas, pesquisar por "Exibição nomeada 2") -->
    <!-- Imprime todos ao mesmo tempo na mesma pagina -->
    <router-view class ="us__content"/>
    <router-view name="helper" class="us__content us__content--helper"/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['id'],
  data () {
    return {
      msg: 'Home'
    }
  },
  computed: {
    username () {
      // Obtendo parametro 'username' da rota
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    rotaProgramatica () {
    
      // usar o this. na frente do router
      // push seria o mesmo que o :to

      // literal string path
      router.push('home')

      // object
      router.push({ path: 'home' })

      // named route
      router.push({ name: 'user', params: { userId: '123' } })

      // with query, resulting in /register?plan=private
      router.push({ path: 'register', query: { plan: 'private' } })


      const userId = '123'
      router.push({ name: 'user', params: { userId } }) // -> /user/123
      router.push({ path: `/user/${userId}` }) // -> /user/123
      // This will NOT work
      router.push({ path: '/user', params: { userId } }) // -> /user
    },
    rotaProgramatica2 () {
      router.replace('home')
    },
    rotaProgramatica3 () {
      // go forward by one record, the same as history.forward()
      router.go(1)

      // go back by one record, the same as history.back()
      router.go(-1)

      // go forward by 3 records
      router.go(3)

      // fails silently if there aren't that many records.
      router.go(-100)
      router.go(100)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
```

## Navigation Guards

Temos tambem uma implementacao muito importante para usarmos, o **navigation guards**.

Com ele podemos carregar conteúdo específicos para cada tipo de usuarios validando por permissões e impedindo que informacoes privadas sejam aessadas por um usuario não autorizado.

Ele fornece funcionalidade adicional referente à forma como as rotas são resolvidas.

Existem três categorias principais de protecões no **Vue Router**

- **Global Guards** _proteções globais_: são chamados quando qualquer navegação é acionada (ou seja, quando as URLs mudam)
- **Per Route Guards** _proteções por rota_: chamados quando a rota associada é chamada (ou seja, quando uma URL corresponde a uma rota específica)
- **In Component Guards** _proteções em componentes_: são chamados quando um componente em uma rota é criado, atualizado ou destruído

Em cada categoria encontramos métodos adicionais que oferecem um controle mais refinado das rotas de aplicativos.

- Guardas Globais
    - beforeEach: ação antes de entrar em qualquer rota (sem acesso ao **this** escopo)
    - beforeResolve: ação antes da confirmação da navegação, mas depois das proteções no componente (o mesmo que beforeEach com acesso ao this escopo)
    - afterEach: ação após a rota ser resolvida (não pode afetar a navegação)
- Protetores por rota
    - beforeEnter: ação antes de entrar em uma rota específica (diferente dos guardas globais, isso tem acesso ao this escopo)
- Protetores de componentes
    - beforeRouteEnter: ação antes da confirmação da navegação e antes da criação do componente (sem acesso ao this escopo)
    - beforeRouteUpdate: ação após a chamada de uma nova rota que usa o mesmo componente
    - beforeRouteLeave: ação antes de sair de uma rota


Devemos saber quando é util utilizar em um cenário X.

Para rastrear visualizações poderiamos usar **afterEach** que é acionado quando a rota e componentes filhos são totalmente carregados. Se quisermos por exemplo fazer uma consulta em uma API antes de carregar a página e armazenar estes dados no **VUEX** poderiamos usar o **beforeEnter**.

Para proteger rotas por permissao de usuarios poderiamos usar o **beforeEnter**.

Podemos setar por rota especifica:

```js
const router = new VueRouter({
  routes: [
    ...
    {
      path: "/x",
      name: "x",
      component: X,
      beforeEnter(to, from, next) {
        // Logica
      }
  ]
})
```

Ou globalmente

```js
const router = new VueRouter({
  routes: [
      ...
  ]
})

router.beforeEnter(async (to, from, next) => {
    ...
})
```

Uma dica é usar o **async**, nem precisa explicar o motivo de usar. Tambem usar o o **try/catch** para evitar o carregamento prematuro antes do carregamento de alguma coisa, neste exemplo, o vuex.

```js
async beforeEach(to, from, next) => {
    try {
        var hasPermission = await store.dispatch("auth/hasPermission");
        if (hasPermission) {
            next()
        }
    } catch (e) {
        next({ name: "Home" })
    }
}

const router = new VueRouter({
  routes: [
      ...
  ]
})
```

As entranhas do **beforeEnter** não é muito diferente guardas, aceita três parâmetros **to**, **from** e **next**.
- **to**: A rota para onde se esta indo
- **from**: A rota de onde esta vindo
- **next**: Funcão para resolver a rota com exito

Geralmente o **next** é chamado sem argumentos
```js
async beforeEach(to, from, next) => {
    next()
}
```

Mas fazendo assim estamos dizendo que o estado da rota é de sucesso sempre. Se quisermos garantir que usuarios não autorizados tenham um destino alternativo podemos redirecionar ele adequadamente passando o nome da rota no **next**
```js
async beforeEach(to, from, next) => {
    next({ name: "Home" })
}
```

Se quisermos verificar pela **vuex** se o usuario logado possui permissao
```js

router.beforeEnter(async (to, from, next) => {
  if (store.getters["auth/hasPermission"]) {
    next()
  } else {
    next({ name: "Login" });
  }
})
```

Ao redirecionar o usuario que não possui privilegios precisamos informar por qual motivo ele foi para uma pagina X ou que tenha voltado, caso contrario ele vai ficar tentando N vezes até saber o real motivo de voltar. Fora isso precisamos depois de ele efetuar o login por exemplo, voltar para a pagina onde estava querendo ir.

Podemos obter a url completa de onde ele estava querendo ir por meio do **to.fullPath** para voltarmos ele no futuro apos um login por exemplo, o **to** possui um conteudo muito valioso que podemos usar ao nosso favor, vale dar um **console.log** nela para saber o que ele nos permite obter.
```js
async beforeEach(to, from, next) => {
    try {
        var hasPermission = await store.dispatch("auth/hasPermission");
        if (hasPermission) {
            next()
        }
    } catch (e) {
        next({
            name: "Login",
            query: { redirectFrom: to.fullPath }
        })
    }
}

const router = new VueRouter({
  routes: [
      ...
  ]
})
```

Estamos passando via **query string** a rota que ele vindo, para verificarmos em login se ele possui esta variavel para avisar ele alguma coisa podemos fazer assim:
```js
const router = new VueRouter({
  routes: [
    ...
    {
      path: "/login",
      name: "Login",
      component: X,
      beforeEnter(to, from, next) {
        if (to.query.redirectFrom) {
            // Faz alguma coisa
        }
      }
  ]
})
```

Para acessar a instancia do vue podemos fazer assim:
```js
const router = new VueRouter({
  routes: [
    ...
    {
      path: "/login",
      name: "Login",
      component: X,
      beforeEnter(to, from, next) {
        next(vm => {
            console.log(vm)
        })
      }
  ]
})
```

Entao, ao entrar na tela de login podemos obter a query e informar o usuario
```js
<template>
  <div>
    <span>{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errorMsg: null
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.redirectFrom) {
      next(vm => {
        vm.errorMsg = "Desculpe, você não tem o acesso certo para acessar a rota solicitada"
      })
    } else {
      next()
    }
  }
}
</script>
```

O que podemos setar são os **meta** dados nas rotas para difinirmos se pode ser vista por todos ou somente adm. A meta não se limita somente a isso, podemos usar para passar o que quisermos.
```js
const router = new VueRouter({
  routes: [
    ...
    {
      path: "/login",
      name: "Login",
      component: X,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/adm',
      component: adm,
      props: false,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'w',
          name: 'w',
          component: w,
          meta: {
            userAdmin: true
          }
        },
        {
          path: 't',
          name: 't',
          component: t,
          meta: {
            userClient: true
          }
        }
      ]
    },

  ]
})
```