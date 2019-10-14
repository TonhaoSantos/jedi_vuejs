# Watch
Sem claro, são **Observadores** de mudanças

São como as computed, mas precisa referenciar uma variável, ou seja, para ela existir a variável tem que existir no **data** ou na **props**.

Por meio dele podemos pegar o valor anterior e o novo da variável que está sendo observada, onde podemos tomar ações customizadas.





```html
<template>
  <div>
    <input type="text" v-model.lazy="nome" /><br>
    {{ nome }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nome: 'Tonhão'
    }
  },
  methods: {
    nome(valorNovo, valorAntigo) {
      console.log('valorNovo', valorNovo)
      console.log('valorAntigo', valorAntigo)
    }
  }
}
</script>
```