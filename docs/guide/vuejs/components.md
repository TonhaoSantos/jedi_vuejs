# Components
Para se usar um componente bastar importar ele, declarar em **components** e depois usar.

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

## Nomenclatura
**BASE**: Componentes que se aplicam a estilos e convenções especificas da aplicação.

Devem ser declarados com _base_, _app_ ou _v_ no começo do nome.

Por exemplo:
- MeuInput.vue
- MeuBotao.vue
- Icone.vue
- ...

Estes anteriores seriam formas ruins de declarar componentes base.

Uma boa forma seria:

_base_
- BaseInput.vue
- BaseBotao.vue
- BaseIcon.vue

_app_
- AppInput.vue
- AppBotao.vue
- AppIcon.vue

_v_
- VInput.vue
- VBotao.vue
- VIcon.vue

**INSTANCIA UNICA**: Componentes que devem ter apenas uma instancia dentro de cada pagina. Por exemplo em uma pagina X que tenha um rodape, logo você não tem dois rodapes ou dois componentes sendo declarados.

- Rodape.vue
- Menu.vue
- MySidebar.vue

Uma boa forma seria:

- TheRodape.vue _ou_ TheFooter.vue
- TheMenu.vue
- TheSidebar.vue

**ORDEM DAS PALAVRAS**: Devem começar com a palavra de mais alto nivel e terminar com palavras que descrevem modificações.

- GeneroCheckbox.vue
- PesquisaInput.vue
- LimparPesquisaBotao.vue
- RodarPesquisaBotao.vue

Uma boa forma seria:
- SetaCheckboxGenero.vue
- PesquisaInput.vue
- BotaoLimparPesquisa.vue
- BotaoPesquisa.vue


Ou separando por **grupo** e **ação**
- PesquisaBotaoLimpar.vue
- PesquisaBotao.vue
- PesquisaInput.vue