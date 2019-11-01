# Filters
Serve apenas para formatar uma variavel

Filtros são permitidos em interpolações **mustache** e expressões **v-bind**


```html
<template>
  <div>
    <!-- em interpolações de texto -->
    <p>{{ nome | capitalize }}</p>

    <!-- em interligações de atributos -->
    <div v-bind:id="rawId | formatId"></div>

    <!-- filtros encadeados, o resultado do primeiro vai para o seguinte e assim por diante -->
    <p>{{ nome | filtroA | filtroB | filtroC }}</p>

    <!-- Podem receber argumentos -->
    <!-- Ela vai receber 3 argumentos, o nome como 1º, a string args1 como 2º e 3º o valor da variavel arg2 -->
    <p>{{ nome | filtroW('arg1', arg2) }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nome: 'Tonhão Santos'
    }
  },
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    filtroW (default, arg1, arg2) {
      ...
    }
  }
}
</script>
```

Um uso comum seria nada transformar texto em minusculo ou maiusculos.