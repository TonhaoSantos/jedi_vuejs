# Props
Para definir propriedades para os componentes:
```html
<template>
  <div id="propNumber">
    <p>{{ propString }}</p>
    <p>{{ propSimples }}</p>
  </div>
</template>

<script>
const ComponenteUm = () => import('@/components/ComponenteUm')

export default {
  name: 'App',
  data () {
    return {
    }
  },
  props: {
    propSimples: String,
    propObjSimples: Object,
    propString: {
      type: String,
      required: true
    },
    propNumber: {
      type: Number
    },
    propComValidacao: {
      type: String,
      validator: function (value) {
        return ['small', 'large', 'overview'].indexOf(value) !== -1
      }
    },
    propComDefaultValor: {
      type: String,
      default: ''
    },
    propBoolean: {
      type: Boolean,
      validator: function (value) {
        return [true, false].indexOf(value) !== -1
      }
    },
    propArray: {
      type: Array,
      validator: function (value) {
        return value
      }
    },
    propMultiTipos: {
      type: [String, Array, Object, Number]
    },
  }
}
</script>
```