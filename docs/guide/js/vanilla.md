# Vanilla

## Array
### Map

Retorna um novo array por meio de uma funcao de tratamento

```js
const num = [4, 5, 8, 9, 50]

function dobraNumero(num) {
    return num * 2
}

const resultadoDobraNumero = numeros.map(dobraNumero)
```

```js
const produtos = [
    { nome: 'Produto 1', preco: 23.67, desconto: 0.2 },
    { nome: 'Produto 2', preco: 45, desconto: 0.5 },
    { nome: 'Produto 3', preco: 1520.88, desconto: 0.15 },
    { nome: 'Produto 4', preco: 10.99, desconto: 0.05 }
]

function custo(produtoDesconto) {
    return parseInt(produtoDesconto * 0.3)
}

function aplicaDesconto(produto) {
    return produto.preco * (1 - produto.desconto)
}

const resultadoAplicaDesconto = produtos.map(aplicaDesconto).map(custo)
```

### Filter
Retorna um novo array por meio de uma funcao de filtragem

```js
const notasAlunos = [5, 8.1, 3, 10, 4.2, 7, 6.9]

function notasAprovadas(nota) {
    return nota > 7
}

const resultado = notasAlunos.filter(notasAprovadas)
// [8.1, 10, 7]
```

```js
const produtos = [
    { nome: 'Produto 1', preco: 23.67, desconto: 0.2 },
    { nome: 'Produto 2', preco: 45, desconto: 0.5 },
    { nome: 'Produto 3', preco: 1520.88, desconto: 0.15 },
    { nome: 'Produto 4', preco: 10.99, desconto: 0.05 }
]

function produtosCaros(produto) {
    return produto.preco > 1000.00
}

function custo(produtoDesconto) {
    return parseInt(produtoDesconto * 0.3)
}

function aplicaDesconto(produto) {
    return produto.preco * (1 - produto.desconto)
}

const resultadoAplicaDesconto = produtos
    .filter(produtosCaros)
    .map(aplicaDesconto)
    .map(custo)
```

### Reduce

Reduz o array em um unico valor.

Recebe 4 parametros, sendo os dois ultimos opcionais.

```js
reduce(acumulador, valorAtual, index, array)
```

- acumulador: valor retornado na última invocação
- valorAtual: elemento atual que está sendo processado no array
- index: opcional, índice do elemento atual que está sendo processado no array
- array: opcional, array ao qual a função reduce() foi chamada

```js
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// a: acumulador
// b: valorAtual
function soma(a, b) {
    return a, b
}

const resultado = numeros.reduce(soma)
// 55
```

Passando valor inicial

```js
// a: acumulador
// b: valorAtual
function soma2(a, b) {
    return a, b
}

// reduce(soma, valorInicial)
const resultado = numeros.reduce(soma, 1000)
// 1055
```

### Find

Retorna o valor do primeiro elemento do array que satisfizer a função provida ou undefined caso nao encontrado.

```js
const notasAlunos = [5, 8.1, 3, 10, 4.2, 7, 6.9]

const found = notasAlunos.find(nota => nota > 8)
// 8.1
```

### Includes

Retorna true se existir o valor passado dentro do array ou false se nao encontrar

Aceita um segundo parametro que seria o indice de start no array, é opcional, se nao informado comeca no indice 0 do array

```js
const notasAlunos = [5, 8.1, 3, 10, 4.2, 7, 6.9]

const found = notasAlunos.includes(5)
// true

found = notasAlunos.includes(2)
// false

[1, 2, 3].includes(3, 3)
// false (nao tem indice 3)

[1, 2, 3].includes(3, -1)
// true

[1, 2, NaN].includes(NaN)
// true
```


## Object

### Object.keys
Retorna um array com todas as propriedades do objeto

```js
const pessoa = {
    nome: 'Fulano',
    idade: 34,
    altura: 1.76,
    peso: 100.00
}

const pessoaPropriedades = Object.keys(pessoa)
// ['nome', 'idade', 'altura', 'peso']
```