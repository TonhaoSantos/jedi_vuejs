# Computed
Nada mais são que **variaveis**, a diferança a **data** é que na **computed** podemos fazer tratativas antes de retornar o valor.

Parecido com o filtro, mas representa a variável em si e não é um método de formatação para que a **variavel** seja melhor apresentada.

Resumindo:
- É uma variavel, como se tivessemos declarado ela no data.
- Mas com algumas regras dentro.
- Ela sempre retorna um dado.

Não precisa ser uma variável declarada no data, ela pode existir sem ter sido declarada lá.

```html
<template>
  <div>
    {{ toUpperCase }}<br>
    {{ fullName }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nome: 'Nome inicial'
    }
  },
  computed: {
    toUpperCase () {
      return this.nome.toUpperCase()
    },
    fullName () {
      return 'Nome sem existir no data';
    }
  }
}
</script>
```

