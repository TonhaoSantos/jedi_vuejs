# Lifecycle hooks
No vue é possivel acessar o ciclo de vida dos componentes, são eles:
- beforeCreate: Antes de disponibilizar os metodos e variaveis</li>
- created: Depois de disponibilizar os metodos e variaveis, verifica se existe elemento e templates</li>
- beforeMount: Antes de montar tudo</li>
- Mounted: Montado, depois daqui temos acesso ao DOM (usar o jquery depois deste ponto se for usar)</li>
- beforeUpdate: Antes de atualizar algum dado</li>
- updated: Depois de atualizado</li>
- beforeDestroy: Antes de tesdruir um elemento</li>
- destroyed: Depois de destruido</li>




```js
<script>
export default {
  name: 'App',
  beforeCreate () {
    console.log('beforeCreate');
    console.log('Variavel titulo: ', this.titulo);
    console.log('Elemento: ', this.$el);
  },
  created () {
    console.log('created');
    console.log('Variavel titulo: ', this.titulo);
    console.log('Elemento: ', this.$el);
  },
  beforeMount () {
    console.log('beforeMount');
    console.log('Variavel titulo: ', this.titulo);
    console.log('Elemento: ', this.$el);
  },
  mounted () {
    console.log('mounted');
    console.log('Variavel titulo: ', this.titulo);
    console.log('Elemento: ', this.$el);
  },
  beforeUpdate () {
    console.log('beforeUpdate');
  },
  updated () {
    console.log('updated');
  },
  data () {
    return {

    }
  }
}
</script>
```