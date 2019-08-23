# JavaScript

## Regras de Escrita em Js
Convenções do javascript

### Nome de Variaveis
Nomenclatura no estilo **camelCase**, onde a primeira palavra se inicia em minuscula e as seguintes me maiuscula.

```js
firstName = "John";
lastName = "Doe";

price = 19.90;
tax = 0.20;

fullPrice = price + (price * tax);
```

### Espaço entre os operadores
Sempre que usar um operador __= + - * /__ utilizar espaço antes e depois dele
```js
var x = y + z;

var values = ["Volvo", "Saab", "Fiat"];
```

### Indentação do codigo
Utilizar uma identação inicial de 4 espaços


### Regras de declaração
Sempre termine uma declaração simples com um ponto e vírgula.

**Obs:** Atualmente é permitido nas novas versões do JS não utilizar ;
```js
// com
var values = ["Volvo", "Saab", "Fiat"];

// sem
var values = ["Volvo", "Saab", "Fiat"]
```
      

### Que linha abrir e fechar os colchetes {}
Coloque o colchete { de abertura no final da primeira linha.

Use um espaço antes do { de abertura.

Coloque o colchete } de fechamento em uma nova linha, sem espaços iniciais.

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```


### Termino de instruções complexas
Não termine uma instrução complexa **função**, **loop**, **condicionais** com um ponto e vírgula.

```js
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}

for (i = 0; i < 5; i++) {
  x += i;
}

if (time < 20) {
   greeting = "Good day";
} else {
  greeting = "Good evening";
}
```

### Regras gerais para definições de objetos
- Coloque o suporte de abertura na mesma linha que o nome do objeto.
- Use dois pontos e mais um espaço entre cada propriedade e seu valor.
- Use aspas em torno de valores de string, não em valores numéricos.
- Não adicione uma vírgula após o último par de valor da propriedade.
- Coloque o suporte de fechamento em uma nova linha, sem espaços iniciais.
- Sempre finalize uma definição de objeto com um ponto e vírgula.

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```


### Objetos curtos
Objetos curtos podem ser escritos compactados, em uma linha, usando espaços apenas entre propriedades.

```js
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```


### Comprimento da linha
Por questões de legibilidade, evite linhas com mais de 80 caracteres.

Se uma instrução JavaScript não couber em uma linha, o melhor lugar para quebrá-la é após um operador ou uma vírgula.

```js
document.getElementById("demo").innerHTML =
"Hello Dolly.";
```


### Outros codigos
Sempre use a mesma convenção de nomenclatura para todo o seu código.

Por exemplo:
- Nomes de variáveis e funções escritos como camelCase
- Variáveis globais escritas em MAIÚSCULAS (não o fazemos, mas é bastante comum)
- Constantes (como PI) escritas em MAIÚSCULAS



### Carregando javascript no HTML
Informar o tipo de script nao é necessário.
    
```html
<script src="myscript.js"></script>
```


### Extensoes de arquivo
Sempre declarar corretamente.

- .html //não .htm ...
- .css
- .js


### Nome de arquivos
Sempre escritos em minusculo.

Servidores Apache, Unix são case sensitive.



### Declaração de variaveis
Todas as variaveis devem ser declaradas no rop do arquivo



### Prefira sempre usar o operador de comparação === ao ==
O operador de comparação == sempre converte (para tipos correspondentes) antes da comparação.

O operador === força a comparação de valores e tipo.
```js
0 == "";        // true
1 == "1";       // true
1 == true;      // true

0 === "";       // false
1 === "1";      // false
1 === true;     // false
```


### Parametros default
Se uma função é chamada com um **argumento**/**parametro** ausente, o valor do argumento/parametro ausente é definido como indefinido.

Valores indefinidos podem quebrar seu código.

É um bom hábito atribuir valores padrão aos argumentos/parametros.

```js
//Indefinido
function myFunction(x, y) {
  if (y === undefined) {
    y = 0;
  }
}

//Default
function myFunction(x = 0, y = 0) {
  if (y === undefined) {
    y = 0;
  }
}
```

### Sempre use **default** em Switche Case

```js
switch (new Date().getDay()) {
  case 6:
    //algumacoisa
    break;
  default:
    //algumacoisa
}
```














## Variaveis
### null, "" e 0
São retornados **false**, qualquer coisa diferente disso é **true**.


### Tipagem dinamina
Não precisa informar o tipo
```js
// Undefined
var oi;

// Null, Undefined ou empty (no typeof null é retornado como um object, bug do javascript)
var car = null;

// String
var nome = "Marcos";

// Number
var idade = 23;

// Float
var peso = 80.5;

// Boolean
var humano = true;
var feliz = false;

// Constante
const IDADE = 27;

// Variavel bloco - Local
let nomeLocal = "Rio de Janeiro";
```


### Dados primitivos
String, Number, Float e Boolean


### Nomenclatura
- Os nomes podem conter letras, dígitos, sublinhados e cifrões.
- Os nomes devem começar com uma carta
- Os nomes também podem começar com $ e _
- Os nomes diferenciam maiúsculas de minúsculas (y e Y são variáveis diferentes)
- Palavras reservadas (como palavras-chave JavaScript) não podem ser usadas como nomes
```js
var $algumacoisa;
var _algumacoisa;
var _algumacoisa;
```


### Case Sensitive
```js
var lastname, lastName;
lastName = "Doe";
lastname = "Peterson";
```


### Camel case (começa com lowercase)
```js
var firstName, lastName, masterCard, interCity;
```


### Unica linha
```js
var x, y;

x = 5; y = 6;
z = x + y;

var x = 7, o = 9, p;

p = 15;
```



### Usando let
Declarando Variavel bloco **Local**

Let é uma variavel de escopo, escopo é todo {}

```js
if (nome == 'Marcos') {
  // Variavel Local com let, se usar var muda a global com o mesmo nome
  let nomeLocal = "São Paulo";
  console.log(nomeLocal);
}

function teste(x) {
  let y = 2;
  console.log(x, y);
  
  if (x > 5) {
    // Outra variavel y
    let y = 16;
    console.log(x, y);
   }
 }
 
 teste(10);
 ```


### Constante - const
Const não pode ser reatribuir um valor, mas pode mutar o valor
```js
const a = 1;
```

Isso vai dar erro de variavel de somente leitura
```js
a = 3;
```

Isso é mutação
```js
const usuario = { nome: 'Tonhao'};

usuario.nome = 'Noob';

console.log(usuario);
```


### Variavel Array - Vetores (Usa colchetes)
_*Forma 1*_
```js
var alunos = ['Diego', 'Bruno', 'Lucas'];
var cores = ["Laranja", "Verde", "Vermelho", "Azul", "Amarelo"];

console.log(cores);
```

Variavel array com função
```js
function fruta () {
  return "Melão";
}

var coresEFrutas = ["Laranja", "Verde", "Vermelho", "Azul", "Amarelo", fruta()];

console.log(coresEFrutas);
```

_*Forma 2*_
```js
var cores2 = [];

cores2[0] = 'Laranja';
cores2[1] = 'Verde';

console.log(cores2);
```


_*Forma 3*_
```js
 var cores3 = new Array("Laranja", "Verde", "Vermelho", "Azul", "Amarelo");

 console.log(cores3);
```


Acessando array
```js
 console.log(alunos[0]);
 console.log(alunos);
```







 //Objeto (Propriedade: valor) - Usa chaves
 //Forma 1
 var usuarioForma1 = {
   nome: "Tonhão",
   sobrenome: "Santos",
   idade: 27,
   nomeCOmpleto : function() {
        return this.nome + " " + this.sobrenome;
    }
 };

 var aluno = {
   nome: 'Maria',
   idade: 23,
   peso: 80.5,
   humano: true,
   nomeIdade : function() {
        return this.nome + " - " + this.idade;
    }
 };

 //Acessando objeto
 console.log(aluno.nome);
 console.log(usuarioForma1);
 console.log(usuarioForma1.nomeCOmpleto());
 console.log(aluno.nomeIdade());

 //Forma 2
 var usuarioForma2 = new Object();
 usuarioForma2.nome = "Tonhão";
 usuarioForma2.sobrenome = "Santos";
 usuarioForma2.idade = 27;

 var x = new String();   //Do tipo string
 var y = new Number();   //Do tipo number
 var z = new Boolean();  //Do tipo boolean

 console.log(usuarioForma2.nome);
 console.log(usuarioForma2);







 //Lista de Objetos ou Array de Objetos
 //Listas
 //Forma 1
 var lista1 = [objeto1, objeto2];
 console.log(lista1);

 //Forma 2
 var lista2 = new Array(objeto1, objeto2);
 console.log(lista2);

 //Forma 3
 var lista3 = [
   {
     nome: "Tonhão",
     sobrenome: "Santos",
     idade: 27
   },
   {
     nome: "Felipe",
     sobrenome: "Santos",
     idade: 24
   },
   {
     nome: "Cacau",
     sobrenome: "Santos",
     idade: 2
   }
 ];

 console.log(lista3);





 //destructuring
 //Uma nova forma de declarar variáveis extraindo valores de objetos e arrays é através do destructuring.
   const [a, b] = [1, 2]

   console.log(a) // 1
   console.log(b) // 2

   //Usando rest parameters (array)
   const [a, b, ...rest] = [1, 2, 3, 4, 5]

   console.log(a) // 1
   console.log(b) // 2
   console.log(rest) // 3, 4, 5

   //Usando rest parameters (objetos)
   const person = { name: 'Matheus', age: 26 }
   const {name, age} = person

   console.log(name) // 'Matheus'
   console.log(age) // 26



const usuario = {
  nome: 'Tonhao',
  idade: 27,
  endereco: {
    cidade: 'São Paulo',
    estado: 'SP'
  }
}

console.log(usuario);



// Obtendo o valores da forma tradicional
const nomeUsu = usuario.nome;
const idadeUsu = usuario.idade;
const cidadeUsu = usuario.endereco.cidade;
console.log(nomeUsu);
console.log(idadeUsu);
console.log(cidadeUsu);

//Usando em função forma tradicional
function mostraNome(usuario) {
  console.log(usuario.nome);
}
mostraNome(usuario);



// Desestruturacao
// Dentro de {} informo o nome das propriedades do objeto que eu quero
const { nome, idade, endereco: { cidade } } = usuario;
console.log(nome);
console.log(idade);
console.log(cidade);


//Usando em função de forma Desestruturacao
function mostraNome({ nome }) {
  console.log(nome);
}
mostraNome(usuario);




















































## Concatenação


## Propriedades Globais


## Funções Globais


## Caracteres Especiais


## Template String (ES6+)


## Impressão "output"


## Funções


## Operadores


## Condição


## Laço Repetição


## Classe e Herança


## DOM


## BOM


## LocalStorage


## Data e Hora


## Math


## Try, Catch e Finally


## Hoisting


## Use Strict


## Object Short Syntax


## Import e Export


## FetchPromise


## Async Await


## Cookie


## Ajax


## JSON