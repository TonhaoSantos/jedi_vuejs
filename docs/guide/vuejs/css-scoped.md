# CSS Scoped
Muita das vezes temos que poder fazer um estilo css definido como **scoped** ter efeito em um elemento filho.

Para explicar melhor podemos tomar como exemplo este codigo:

```html
<template>
  <div>
    <ComponenteUm class="qualquerCoisa"/>
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
  components: {
    ComponenteUm
  }
}
</script>

<style scoped>
.qualquerCoisa {
    color: Tomato
}
</style>
```

Digamos que queremos que a classe **.qualquerCoisa** funcione dentro do filho **ComponenteUm**, come definimos o **scoped** esta classe não vai fazer nenhuma ação fora deste componente/view chamado **App**.

Para burlarmos isso podemos fazer de algumas formas, dentre elas temos:

```css
<style scoped>
/deep/ .qualquerCoisa {
    color: Tomato
}

.classePai {
    &::v-deep .qualquerCoisa {
        color: Tomato
    }
}

.classePai >>> .qualquerCoisa {
    color: Tomato
}
</style>
```

Como vimos temos **/deep/**, **::v-deep** e **>>>**.

O **Sass** como alguns outros pré-processadores podem não ser capazes de analisar **>>>** corretamente, dai neste caso alteramos para algum dos outros tipos disponiveis.