# Components
Para se usar um componete bastar importar ele, declarar em **components** e depois usar.

```html
<template>
  <div>
    <ComponenteUm></ComponenteUm>
    <componente-um></componente-um>

    <ComponenteDois />
    <componente-dois/>
  </div>
</template>

<script>
const ComponenteUm = () => import('@/components/ComponenteUm')
const ComponenteDois = () => import('@/components/ComponenteDois')

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    ComponenteUm,
    ComponenteDois
  }
}
</script>
```

Para passar valor por meio das propriedades
```html
<template>
  <div>
    <ComponenteUm :valores='valor' :novo="novoArray" outraProp="valor qualquer" :soma="{ 10 + 5}" />
  </div>
</template>

<script>
const ComponenteUm = () => import('@/components/ComponenteUm')

export default {
  name: 'App',
  data () {
    return {
      valor: 10,
      novoArray: [10, 20, 30]
    }
  },
  components: {
    ComponenteUm
  }
}
</script>
```

Quando for passar valores para as propriedades de um componente, se o valor vou um dado, variavel, computed ou javascript por meio de {}, usa o : na frente do nome da prorpriedade, caso contrario é somente passar o valor.