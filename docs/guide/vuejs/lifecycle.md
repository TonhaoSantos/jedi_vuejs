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

## beforeCreate

Primeiro gancho que é chamado depois que a instância do Vue foi inicializada. Nesta fase, a observação de dados (reatividade), eventos, propriedades computadas e observadores ainda estão por ser configurados. Portanto, não podemos interagir com nenhuma parte do componente.

## Created

Chamado depois que a instância é criada. Nesse estágio, a instância concluiu o processamento, a observação de dados (reatividade), propriedades calculadas, métodos, observadores e retornos de chamada de eventos foram configurados. Você não pode interagir com o DOM neste estágio porque seu componente não foi montado. A propriedade $el também não está disponível ainda.

## beforeMount

Nesse momento o modelo é compilado a partir do modelo ou das opções de renderização ou do outerHTML do elemento no qual o Vue foi inicializado. O modelo ainda não foi renderizado e o método $el também não existe. Observe que esse gancho não é chamado durante a renderização do lado do servidor.

## Mounted

Chamado depois que a instância foi montada, em que a propriedade el é substituída pela vm.$el recém-criada. Se a instância raiz estiver montada em um elemento no documento, vm.$el também estará no documento quando a montagem for chamada. O componente se torna totalmente funcional depois que o gancho montado é chamado e podemos interagir completamente com ele.

Uma coisa a observar é que o mounted não garante que o elemento tenha sido adicionado ao DOM. Para executar um código dependente do DOM nesse estágio, coloque o código dentro de um método de retorno de chamada na função Vue.nextTick() (Vue.nextTick() adia seu retorno de chamada para ser executado após o próximo ciclo de atualização do DOM).

Exemplo
```js
<script>
export default {
  mounted() {
    this.$nextTick(() => {
       console.log(this.$el.textContent);
    }
  }
}
</script>
```

## beforeUpdate

É chamado sempre que são feitas alterações em nossos dados e o DOM precisa ser atualizado, imediatamente antes do patch do DOM. Este é um bom lugar para acessar o DOM existente antes de uma atualização, por exemplo, para remover manualmente um ouvinte de evento adicionado. Esse gancho não é chamado durante a renderização do lado do servidor, porque apenas a renderização inicial é executada no lado do servidor.

## updated

É acionado após a alteração. O DOM do componente teria sido atualizado quando esse gancho for chamado, para que você possa executar operações dependentes do DOM aqui. No entanto, na maioria dos casos, você deve evitar alterar o estado dentro do gancho. Para reagir às alterações de estado, geralmente é melhor usar uma propriedade ou observador computado.

Observe que atualizado não garante que todos os componentes filhos também tenham sido renderizados novamente. Se você quiser esperar até que toda a exibição seja renderizada novamente, use vm.$nextTick dentro de updated

## beforeDestroy

Chamado logo antes que uma instância do Vue seja destruída. Nesta fase, a instância ainda está totalmente funcional. Você pode executar as limpezas necessárias aqui. Observe que ele não é chamado durante a renderização do lado do servidor.

## destroyed

Chamado depois que uma instância do Vue foi destruída. Quando ele é chamado, todas as diretivas da instância do Vue foram desconectadas, todos os ouvintes de eventos foram removidos e todas as instâncias filho do Vue também foram destruídas. Observe que ele não é chamado durante a renderização do lado do servidor.