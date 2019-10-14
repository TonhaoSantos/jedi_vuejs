# Methods
São funções

Para usar ela é desta maneira:
```html
<template>
  <div>
    <a @click="sum"></a>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      a: 10,
      b: 30,
      c: 0
    }
  },
  methods: {
    sum () {
      this.c = this.a + this.b
    }
  }
}
</script>
```

ou usando o this.nomeMetodo:
```html
<template>
  <div>
    <a @click="calc"></a>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      a: 10,
      b: 30,
      c: 0
    }
  },
  methods: {
    sum () {
      this.c = this.calc(this.a, this.b)
    },
    calc () {
      this.sum()
    }
  }
}
</script>
```
