# Emit
Para passar uma informação de um componente **filho** para o **pai** podemos fazer a emissão de conteúdo.

Tomando como base um componente pai qualquer que tem um filho chamado **MyComponent** que passa o seu valor recebido por **emit**:

```html
<template>
  <div>
    <MyComponent @return-input-value="componenteValue('myComponent', $event)" />

    <p>Ou apenas o evento</p>
    <MyComponent @return-input-value="componenteValue($event)" />

    <p>Ou nada</p>
    <MyComponent @return-input-value="componenteValue()" />
  </div>
</template>

<script>
const MyComponent = () => import('@/components/myComponent')

export default {
  name: 'Pai',
  data () {
    return {
      value: ''
    }
  },
  components: {
    MyComponent
  },
  methods: {
    componenteValue (refValue, eventValue) {
      if (refValue === 'myComponent') {
        this.value = eventValue
      }
    }
  }
}
</script>
```

O filho por sua vez tem um input que **emit** seu valor para o **pai**:

```html
<template>
  <div>
    <input v-model="inputValue" @change="returnValue">
  </div>
</template>

<script>
const MyComponent = () => import('@/components/myComponent')

export default {
  name: 'Filho',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    returnValue () {
      this.$emit('return-input-value', this.inputValue)
    }
  }
}
</script>
```