# Diretivas

Diretivas são as formas que temos para manipular o template, com ela podemos alterar o nosso DOM.

O Vue nos da a possibilidade de usar varias diretivas como tbm criar as nossas proprias customizadas.


Não vou mostrar como montar a nossa, mas na DOC do Vue podemos ver como fazer facilmente.

Toda diretiva deve ser declara com **v-** na frente, tirando duas que podemos omitir/abreviar (Sessão abreviação).

Algumas diretivas podem receber parâmetros, argumentos dinâmicos e modificadores, são elas o **v-bind** e o **v-on**, falarei quando chegar nestes dois.

## Diretivas
- v-text
- v-html
- v-show
- v-once
- v-if
- v-else
- v-else-if
- v-for
- v-bind
- v-bind:class
- v-bind:style
- v-model
- v-on
- v-cloak
- v-slot
- v-pre


## v-text
É outra forma que temos para imprimir variáveis sem ser com o mustache.

Nas diretivas não precisamos usar o **this.nomeVariavel** para acessa-lá pois já tentam pegar os dados por padrão.

```html
<span v-text="msg"></span>

<span>{{msg}}</span>
```

## v-html
É usada para imprimir conteúdo html, ou seja, atualiza o innerHTML do elemento.

Então se tivermos uma variavel com o conteúdo:
```js
<script>
export default {
  name: 'App',
  data () {
    return {
      conteudo: '<h2>Seja Bem Vindo</h2>'
    }
  }
}
</script>
```

E passarmos ele pela diretiva **v-html** ele sera inserido como HTML e não compilado como template vue.

Então declarando isso:

```html
<span v-text="conteúdo"></span>
```
Seria isso ao carregar a página:

```html
<span><h2>Seja Bem Vindo</h2></span>
```

Evite usar v-html em todo seu código pois pode facilmente levar a ataques **XSS**. Use somente em conteúdo confiável e nunca em conteúdo fornecido pelo usuário.

Um lembrete, estilos **scoped** não serão aplicados a conteúdos v-html pois o HTML não é processado com o template do vue.

## v-show
O **v-show** sempre será renderizado e permanecerá no DOM, ela apenas alterna a propriedade CSS de exibição do elemento.

O v-show não suporta o elemento **< template >**, nem funciona com o **v-else**.

Então se tivermos uma variavel com o conteúdo:
```js
<script>
export default {
  name: 'App',
  data () {
    return {
      mostra: true
    }
  }
}
</script>
```

```html
<div v-show="mostra">Seja Bem Vindo</div>
```

## v-once
Esta por sua vez faz o papel contrario ao **v-show**, ela desliga a reatividade.

Então o dado vai ser carregado uma vez, se for alterado ou  nas renderizações subsequentes, o elemento/componente e todos os seus filhos serão tratados como conteúdo estático e ignorados. Isso pode ser usado para otimizar o desempenho da atualização.

```js
<script>
export default {
  name: 'App',
  data () {
    return {
      nome: 'Nome inicial'
    }
  }
}
</script>
```

```html
<div v-once>{{ name }}</div>
<input type="text" v-model="name" />
```

Ao inserir um novo nome no input ele nao será refletido na **div** pois ela já foi renderizada e por ter o **v-once** não vai sofrer mutação. Resumindo, apenas uma vez ocorrera a mutação.

## v-if, v-else e v-else-if
Podemos fazer teste condicional com esta diretiva

A condição funciona da mesma forma que trabalhamos em javascript

```html
<div v-if="valor === 'A'">
  A
</div>
<div v-else-if="valor === 'B'">
  B
</div>
<div v-else-if="valor === 'C'">
  C
</div>
<div v-else>
  Não A/B/C
</div>
```



## v-for
A diretiva **v-for** nos permite percorrer itens em uma matriz ou objeto. Requer uma sintaxe especial na forma de ```item in lista```, em que **lista** é a matriz de dados de origem e **item** é um **alias** para o elemento da matriz que está sendo iterado.

A forma mais simples é esta:
```html
<div v-for="item in lista">
  {{ item.texto }}
</div>
```

Podemos obter o seu indice:
```html
<div v-for="(item, indice) in lista">
  {{ item.texto }}
</div>

Outra coisa importante é que você pode informar a identidade de cada nó, ajudando o vue a rastrear facilmente eles se for por exemplo precisar reordenar os itens, não só para isso, o vue por meio da **key** efetua a ordenação do item:
```html
<div v-for="(item, indice) in lista" :key="indice">
  {{ item.texto }}
</div>
```

No **:key** você pode informar qualquer coisa que venha identificar exclusivamente cada item, eu costumo usar o indice por ser unico.

Alternativamente, você também pode especificar um alias para o índice (ou a chave, se usada em um Objeto):
```html
<div v-for="(item, indice) in lista"></div>
<div v-for="(valor, chave) in objeto"></div>
<div v-for="(valor, nome, indice) in objeto"></div>
```

## v-bind
É usado para ligar dinamicamente um ou mais atributos ou um suporte de componente a uma expressão.

Quando usado para vincular o atributo de classe ou estilo, ele suporta tipos de valor adicionais, como Matriz ou Objetos.

Você pode omitir o v-bind deixando apenas os dois pontos (Mas na sessão abreviação).

Resumidamente o v-bind é usado para passar valores dinâmicos para atributos html como src, classe, style, name, id, ... Todos os atributos praticamente.

```html
<img v-bind:src="imageSrc">

<!-- valor dinâmico -->
<button v-bind:[key]="value"></button>

<img :src="'/path/to/images/' + fileName">

<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- propriedade de um componente -->
<my-component :prop="someThing"></my-component>
```

A forma abreviada para o v-bind seria retirando o v-bind e deixando apenas o atributo:
```html
<img :src="imageSrc">
```



## v-model
Esta diretiva nos permite vincular uma variável com o valor do elemento.

Isso é chamado de data binding **(two-way binding)**, que faz parte da reatividade.

Quando alterar o valor do imput ele sera alterado na variavel no mesmo instante.

Limitado a:
- input
- select
- textarea
- componentes

Possui modificadores:
- .lazy - escuta por eventos change ao invés de input, ou seja, quando retirar o foco do componente
- .number - faz a conversão da String informada para números
- .trim - faz trim dos dados informados


```js
<script>
export default {
  name: 'App',
  data () {
    return {
      nome: ''
    }
  }
}
</script>
```

```html
<div>{{ nome }}</div>
<input type="text" v-model="nome" />
```

Com modificador

```html
<div>{{ nome }}</div>
<input type="text" v-model.trim="nome" />
```


## v-on
Esta é a forma que o Vue nos dá para executar ações, invocar eventos.

Você pode omitir o v-on: deixando apenas @nomeEvento

Existem alguns eventos:
- change
- blur
- focus

Existem modificadores de eventos, e a ordem importa ao definir modificadores encadeados:

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

```html
<!-- a propagação do evento click será interrompida -->
<a v-on:click.stop="doThis"></a>

<!-- o evento submit deixará de recarregar a página -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- modificadores podem ser encadeados -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- é possível utilizar apenas o modificador -->
<form v-on:submit.prevent></form>

<!-- usar modo de captura ao adicionar o evento -->
<!-- ou seja, um evento em um elemento interno é tratado aqui após ser tratado por aquele elemento -->
<div v-on:click.capture="doThis">...</div>

<!-- só aciona o manipulador se event.target é o próprio elemento -->
<!-- isto é, não aciona a partir de um elemento filho -->
<div v-on:click.self="doThat">...</div>
```

Existem modificadores de teclado, o uso de keyCode (numero da tecla) esta obsoleto e pode não funcionar em alguns navegadores:
- .enter
- .tab
- .delete (captura tanto “Delete” quanto “Backspace”)
- .esc
- .space
- .up
- .down
- .left
- .right

```html
<input v-on:keyup.13="submit">

<input v-on:keyup.enter="submit">
```

Existem modificadores de sistema
- .ctrl
- .alt
- .shift
- .meta

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Faça alguma coisa</div>
```

Modificador extra, o **.exact** permite controlar a exata combinação de modificadores de sistema que deve ser pressionada para que o gatilho dispare.

```html
<!-- dispara mesmo se Alt ou Shift também estiverem pressionados -->
<button @click.ctrl="onClick">A</button>

<!-- dispara quando somente Ctrl estiver pressionado -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- dispara somente se não houverem teclas de sistema pressionadas -->
<button @click.exact="onClick">A</button>
```

Existem modificadores de mouse, restringem o manipulador a eventos disparados por um botão específico do mouse, respectivamente o botão da esquerda, o da direita e o central (quando existente).
- .left
- .right
- .middle

```html
<div @click.middle="name = 'x'">{{ name }}</div>
```


## v-cloak
Essa diretiva permanecerá no elemento até que a instância associada de Vue termine de compilar. Ao ser combinada com regras CSS como [ v-cloak ] { display: none }, essa diretiva pode ser usada para esconder interligações mustache não-compiladas até que a instância de Vue esteja pronta.

A **div** não ficará visível até que a compilação tenha terminado.

No css:
```
[v-cloak] {
  display: none;
}
```

No html:
```html
<div v-cloak>
  {{ mensagem }}
</div>
```

## v-bind:class ou :class
```js
data: {
  isActive: true,
  hasError: false
}

<div v-bind:class="{ active: isActive }"></div>


<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>


// Pode receber uma computed que retorne um objeto de chave:valor
<div v-bind:class="classObject"></div>


// Pode receber um array para aplicar uma lista de classes
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
<div v-bind:class="[activeClass, errorClass]"></div>


// Pode receber o valor condicionalmente
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>


// Pode usar a sintaxe de objeto dentro da de array
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

Quando você utiliza o atributo **class** em um componente personalizado, estas classes serão adicionadas ao elemento raiz. Classes que já existam neste elemento não serão removidas.

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Oi</p>'
})


// Chamando o componente e declarando outras classes
<my-component class="baz boo"></my-component>


// Resultado
<p class="foo bar baz boo">Oi</p>
```

O mesmo vale para v-bind:class
```js
<my-component v-bind:class="{ active: isActive }"></my-component>

// Resultado
<p class="foo bar active">Oi</p>
```



## v-bind:style ou :style
É bastante parecido com **:class** mas em um objeto, pode usar **camelCase** ou **kebab-case** para nome das propriedades.
```js
data: {
  activeColor: 'red',
  fontSize: 30
}

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

O mais indicado é vincular com um objeto diretamente para ficar mais limpo o codigo:
```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

<div v-bind:style="styleObject"></div>
```

Pode ser usado com computeds que retornam objetos de **chave:valor**.

Aceita array, mas aceita objetos apenas.
```js
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

Quando você usa uma propriedade CSS que requer prefixos de fabricantes em **v-bind:style**, por exemplo **transform**, Vue irá automaticamente detectar e adicionar os prefixos apropriados para os estilos aplicados.

Podemos disponibilizar um array com múltiplos valores (prefixados) para estilizar um atributo, por exemplo:
```js
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Isto irá renderizar apenas o último valor do Array que o navegador suportar. Neste exemplo, irá renderizar display: flex nos navegadores que suportam a versão sem prefixo do módulo Flexbox.


## v-slot
Slot é a forma que temos de deixar o conteudo de um elemento dinamico.

Se tivessemos uma **div** que não sabemos tudo que vai dentro dela, mas sabemos que por padrão ela vai ter uma tag **p**, poderiamos definir um **slot** dentro desta div chamada **outros** e quando formos querer passar este conteudo extra é só passar um slot com o nome outros e ele sera definido dentro da div.

Outro exemplo seria um componente de card que vai receber slots juntamente com o conteudo dele.

Componente card:
```html
<div>
  <h1>Titulo Fixo do Card</h1>
  <slot name="descrição"></slot>
  <slot name="link"></slot>
</div>
```

Chamando o componente card e passando os slots
```html
<card>
  <p slot="descrição">Descrição qualquer, ......</p>
</card>
```

Seria renderizado:
```html
<div>
  <h1>Titulo Fixo do Card</h1>
  <p>Descrição qualquer, ......</p>
</div>
```

Se eu passar o link:
```html
<div>
  <h1>Titulo Fixo do Card</h1>
  <p>Descrição qualquer, ... </p>
  <a href="#">algum lugar</a>
</div>
```

Basicamente são espaços reservados para outros conteudos, mesmo um elemento permitindo passar slots, não é obrigatorio passar só pq ele permite, você que escolhe, é apenas um espaço reservado para aquele item, se ele não for passado **OK**.

Outra coisa, o slot passado pode ser um texto, tag, outro componente, ...


## v-pre
Nos permite ignorar a compilação para o elemento em questão e todos os seus filhos.

Podemos usar para imprimir o mustache.

Se usarmos muitas vezes esta tecnica pode nos permitir aceleração na compilação.

Se quisermos imprimir por exemplo este mustache **{{ nomeDoUsuario }}**, podemos fazer assim:

```html
<h1 v-pre>{{ nomeDoUsuario }}</h1>
```

Logo a saida será um **H1** com o conteudo __nomeDoUsuario__ dentro.



## Diretiva personalizada
Como podemos ver as diretivas são atributos especiais com o prefixo **v-**

Elas tem o papel de aplicar reativamente efeitos colaterais ao DOM quando o seu valor for alterado.

Vimos que o **Vue** fornece uma ampla variedade de diretivas para usarmos.

### NOME
Para criar uma diretiva o mais basico que precisamos informar é um nome, somente informando um nome ela não aceita argumentos e nem possui modificadores.

Se não for possivel passarmos um valor ela basicamente nao será muito flexível mas pode ter alguma funcionalidade do **DOM**.

O modelo mais basico de uma diretiva seria o **v-else**.

Um exemplo de diretiva basica poderia ser este:

```html
<app-navigation v-sticky> </app-navigation>
```

### VALOR
Podemos passar um valor para um diretiva, por exemplo o **v-else**:

```html
<div v-if="mostrar">Pode ser mostrado</div>
```

Poderiamos passar uma **string**:

```html
<div v-fruta="'banana'"></div>
```

Que seria mais ou menos igual ao v-html.


### ARGUMENTOS
Diretivas personalizadas podem receber um argumento indicado por dois-pontos após o nome da diretiva.

Um exemplo:

```html
<app-navigation v-sticky:bottom> </app-navigation>
```

Nome da diretiva é **sticky** e o argumento **button**.

As diretivas podem ter apenas um argumento.



### MODIFICADORES
São correções especiais indicadas por um ponto que indicam que uma diretiva deve ser vinculada de alguma maneira especial.

Serve para controlar como a diretiva se comporta.
```html
<span v-formatar.sublinhado>Texto</span>
```

Neste exemplo o modificador aplica um sublinhado ao texto. Podemos usar varios modificadores encadeados ao mesmo tempo.
```html
<span v-formatar.negrito.destacado.sublinhado>Texto</span>
```

Neste outro exemplo o texto estará em negrito, destacado e com sublinhado.


### HOOKS
O VUE dispobiliza algumas hooks para usarmos nas diretivas.

- **bind** - isso ocorre uma vez quando a diretiva é anexada ao elemento.
- **inserted** - isso ocorre quando o elemento é inserido no DOM pai
- **update** - isso ocorre quando o elemento é atualizado, mas as crianças ainda não foram atualizadas
- **componentUpdated** - isso ocorre quando o componente e os filhos foram atualizados
- **unbind** - isto ocorre quando a diretiva é removida

E cada um deles possuem os argumentos **el** , **binding** e **vnode** argumentos disponíveis para eles:

- **el** - o elemento em que a ligação está
- **binding** - um objeto que contém os argumentos que são passados ​​para os ganchos. Existem muitos argumentos disponíveis, incluindo name, value, oldValue, expression, arg e modifiers.
- **vnode** - permite referir-se diretamente ao nó no DOM virtual, se necessário. Tanto a **binding** quanto o **vnode** devem ser tratados como somente leitura.
- **update** e **componentUpdated** - ambos expõem um argumento adicional chamado **oldvnode**. O argumento oldvnode é usado para diferenciar entre o valor mais antigo passado e o valor mais recente. **bind** e **update** são os mais úteis dos cinco.


### CRIANDO
Podemos criar diretivas globalmente na nossa aplicacao por meio do **Vue.directive** e passando um nome para ela:

```js
// No main.js
Vue.directive ('sticky');
```

Para usar esta diretiva podemos fazer assim:
```html
<app-navigation v-sticky></app-navigation>
```

### EXEMPLOS
_Deixa o componente fixo na tela_
```html
<app-navigation v-sticky></app-navigation>
```
```js
Vue.directive('sticky',
    function(el, binding, vnode) {
        el.style.position = 'fixed';
    }
))
```

_Define a cor do texto para laranja_
```html
<h1 v-orange>Ola mundo</h1>
```
```js
Vue.directive("orange", function(el, binding, vnode) {
    el.style.color = "orange";
})
```



_Passando uma cor para a diretiva_
```html
<h1 v-color="'red'">{{ msg }}</h1>
<h1 v-color="'blue'">{{ msg }}</h1>
<h1 v-color="'#ffff00'">{{ msg }}</h1>
```
```js
Vue.directive("color", function(el, binding, vnode) {
    el.style.color = binding.value;
})
```

_Passando argumento para definir se vai ficar fixo no top ou bottom da tela. Se não for passado nada vai ser no top_
```html
<!-- (top -->
<app-navigation v-sticky></app-navigation>

<!-- (bottom -->
<app-navigation v-sticky:bottom></app-navigation>
```
```js
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
```

```html
<div v-example a="hi"></div>
```
```js
Vue.directive('example', {
  params: ['a'],
  bind: function () {
    console.log(this.params.a) // -> "hi"
  }
})
```


_Modificadores_
```html
<span v-format.underline>guide</span>
<span v-format.bold>configure / customize</span>
<span v-format.highlight>check out</span>
<h3 v-format.highlight.bold.underline>Installed CLI Plugins</h3>
```
```js
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
```



_Hooks em ação_
```html
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
```
```js
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
```

```js
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
```
```js
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