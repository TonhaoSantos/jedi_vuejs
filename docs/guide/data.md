# Data
Data nada mais é do que o local onde declaramos as nossas ***"*** __variável__ ***"***.

E como tal, temos *string*, *numero*, *boolean*, *array*, *…* e todos os outros que o javascript nos fornece.

Os dados são declarados dentro do atributo data, que é uma função de retorno declarado dentro do script.

Ai estão alguns exemplos de variaveis.

```js
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: `Oi eu sou o ${this.name}`,
      name: 'Tonhão',
      age: 27,
      married: true,
      hobby: [
        'Jogar Games',
        'Arduino',
        'Vue'
      ],
      favoriteFood: {
        name: 'Lasagna',
        sauce: 'Bolognese',
        withSoda: true,
        soda: 'Coca-Cola'
      }
    }
  }
}
</script>
```

Estes dados são reativos, ou seja, se sofrer alguma mudança ela sera replicada onde estiver sendo usada.

Assim que eles sofrerem alteração serão atualizados sem atualizar a página.

Para usar a variável em qualquer outro lugar do componente podemos usar o this.nomeVariavel para acessá la:

```js
<script>
export default {
  name: 'App',
  data () {
    return {
      msg: `Oi eu sou o ${this.name}`,
      name: 'Tonhão'
    }
  }
}
</script>
```

Não se limita em ser usada somente no data por meio do **this**, pode ser usada com o _this_ nos methods, filters, ...

Para se usar no **HTML** pule para a sessão **interpolação** (Próxima sessão).

Resumidamente, isso é tudo que temos que aprender sobre as variaveis/dados/data.
