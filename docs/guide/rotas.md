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