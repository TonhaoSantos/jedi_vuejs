# Abreviações
Conforme falado nas diretivas, o v-bind e o v-on podem ser declarados abreviados.

O v-bind:
```html
<a v-bind:href=""></a>
```

Ficaria:

```html
<a :href=""></a>
```

E o v-on
```html
<a v-on:click="algumaFuncao"></a>
```

Ficaria:

```html
<a @click="algumaFuncao"></a>
```