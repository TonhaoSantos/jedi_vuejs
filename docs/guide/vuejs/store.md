# Store
Para usar o sistema de modulos da store que eu uso é da seguinte forma:

```html
<template>
  <div>
    {{ nomeGetters }}
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'NomeComponente',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('NomeComponenteDeclaradoState', ['nomeStates']),
    ...mapGetters('NomeComponenteDeclaradoState', ['nomeGetters'])
  },
  methods: {
    ...mapActions('NomeComponenteDeclaradoState', ['nomeActions'])
  }
};
</script>
```

Dificilmente vamos usar states, pelo menos eu custumo usar os getters.

As actions servem para atualizar o state que ele refencia.