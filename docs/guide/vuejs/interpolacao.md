# Interpolação
Uma das formas de imprimir/usar uma variável no HTML é por meio dos **mustaches**.

Mustaches são chaves duplas {{}} onde dentro dela você informa a variável para impressão.

```html
<span>Mensagem: {{ msg }}</span>
```

Se no meu data tiver uma variável chamada msg, o valor dela sera impresso dentro do mustache.

Vale lembrar que é reativo, ou seja, ao sofrer alguma mudança ela sera refletida onde estiver sendo impressa.

Mustache não pode ser usado em atributos HTML, para isso existe o v-html que se encontra na sessão **diretivas**.

Logo um erro seria disparado com isso:
```html
<span id="msg">Mensagem</span>
```

Adiantando um pouco o **v-html**, para se usar no atributo você teria que fazer isso:
```html
<span v-bind:id="msg">Mensagem</span>
```

Ou a forma abreviada (sessão abreviação)

```html
<span :id="msg">Mensagem</span>
```

O **Mustache** não se limita apenas em imprimir variáveis, você pode usar todo o poder das expressões do **JavaScript**, na verdade não apenas nos mustaches mas tambem dentro de qualquer tipo de data binding.

```js
{{ idade + 6 }}

{{ viajar ? 'SIM' : 'NÃO' }}

{{ msg.split('').reverse().join('') }}
```

```html
<div v-bind:id="'lista-' + id"></div>

<div :id="'lista-' + id"></div>
```

Isso não funcionaria:

```js
// atribuição, o correto seria uma expressão
{{ var j = 56 }}

// controle de fluxo, para isso existem as diretivas v-if, v-else, ... (Conferir na sessão de diretivas)
{{ if (ok) { return message } }}
```