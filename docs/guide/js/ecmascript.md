# ECMAScript

Para saber o que é suportado em em cada versao e onde, podemos usar este site [aqui](http://kangax.github.io/compat-table/es6/).

## Spread e Rest (ES6)

Spread (espalha os elementos)
```js
const numbers = [1, 10, 99, -5]

// A funcao max espera cada elemento, nao o array completo assim Math.max(numbers)
// O spred vai fazer como se fosse Math.max(1, 10, 99, -5)
console.log(Math.max(...numbers))
```

Outro exemplo

```js
const turmaA = ['João', 'Maria', 'Fernanda']
const turmaB = ['Fernando', 'Miguel', 'Lorena', ...turmaA]
const turmaC = ['Carlos']

const turmaW = ['Paula', ...turmaC, 'Mateus', ...turmaA]

console.log(turmaB)
console.log(turmaW)
```

Rest (Recebe vairos valores e retorna tudo dento de um)
```js
function retornaArray(...argumentos: number[]): number {
    return argumentos
}

// Passa os numeros separados e a funcao junta tudo com o REST num array
const numeros = retornaArray(1, 2, 3, 4, 5)
conosle.log(numeros)

// Separando os numeros com Spread
const numbers = [1, 10, 99, -5]
conosle.log(retornaArray(...numbers))
```

Outro exemplo

```js
// Passando outros argumentos (sempre o Rest deve ser o ultimo parametro para nao dar erro)
function retornaArray(a: number, ...argumentos: number[]): number {
    // O a sera o primeiro numero passado na funcao e os demais sera os argumentos
    console.log(a)

    return argumentos
}

const numeros = retornaArray(1, 2, 3, 4, 5, 345, 623)
conosle.log(numeros)
```