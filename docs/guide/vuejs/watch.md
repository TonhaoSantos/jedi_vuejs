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
  watch: {
    nome(valorNovo, valorAntigo) {
      console.log('valorNovo', valorNovo)
      console.log('valorAntigo', valorAntigo)
    }
  }
}
</script>
```

Objetos e Array não podem ser observados, para tanto podemos usar o deep.
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
      nomes: []
    }
  },
  watch: {
    nomes: {
      deep: true,
      // O immediate serve para ele o watch observar imediatamente depois do carregamento da pagina, em alguns casos pode ocorrer de a propriedade receber um valor default no carregamento e depois de carregar nao alterar 
      immediate: true,
      handler(valor) {
        console.log('valor', valor)
      }
    }
  }
}
</script>
```

O podemos usar uma string para definir a funcao do hander (setada no methods)
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
      nomes: []
    }
  },
  watch: {
    nomes (valor) {
      console.log('valor', valor)
    }
  }
}
</script>
```

O handler pode ser abreviado
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
      nomes: []
    }
  },
  methods: {
      fazAlgo (value) {
        console.log(value)
      }
  },
  watch: {
    nomes: {
      handler: 'fazAlgo'
    }
  }
}
</script>
```