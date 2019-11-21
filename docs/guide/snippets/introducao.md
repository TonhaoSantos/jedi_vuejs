# Snippets

Para se criar **snippets** no **vscode** temos duas formas:

- Criar um snippet global que vai funcionar independenta da linguagem escolhida
- Criar um snippet especifico de uma linguagem

O global tem seu nome de arquivo mais a extensão **.code-snippets** e o especifico tem o nome da linguagem mais a extensão **.json**.

Os arquivos ficam localizados dentro do diretorio do _vscode_, sendo mais especifico ```Code > User > snippets```.

O conteudo basico seria:

```js
{
  "Nome do Snippet": {
    "prefix": "acaoParaChamar",
    "body": [
      "console.log(",
      "$1",
      ");"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

Em **prefixo** podemos declarar um array de palavras acionadoras ou uma conforme o exemplo anterior:
```js
{
  "Nome do Snippet": {
    "prefix": ["acaoParaChamarX", "acao", "acaoPara", "X", "x"],
    "body": [
      "console.log(",
      "$1",
      ");"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

Em **body** definomos o conteudo do snippet em array, cada item do array corresponde a uma nova linha. Logo, ```console.log(``` ficara em uma linha, ```$1``` em outra e ```);``` em outra, imprimindo ao ser usado:

```js
console.log(
    // O ponteiro vai parar aqui por causa do espaco reservado
);
```

O _body_ possui três espacos reservados, sendo eles $1, $2 e $0 listados na ordem transversal.

Os espacos reservados podem ser declarados assim:

```js
{
  "Nome do Snippet": {
    "prefix": ["acaoParaChamarX", "acao", "acaoPara", "X", "x"],
    "body": [
      "console.log(`${1:elemento} alguma outra palavra ${2:elemento} alguma outra palavra ${0:elemento}`);"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

ou assim :

```js
{
  "Nome do Snippet": {
    "prefix": ["acaoParaChamarX", "acao", "acaoPara", "X", "x"],
    "body": [
      "console.log(`$1 alguma outra palavra $2 alguma outra palavra $0`);"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

No primeiro exemplo podemos passar dentro de {} o numedo seguido por uma palavra identificando o que vai no local.

Por exemplo, se tivermos uma funcão que faz um calculo recebendo dois valores e um operador:

```js
{
  "Nome do Snippet": {
    "prefix": ["acaoParaChamarX", "acao", "acaoPara", "X", "x"],
    "body": [
      "function(let x = ${1:valorUm}, let y = ${2:valorDois}, let r = ${0:operadorMatematico}) {"`,
      "return x r y;",
      "}"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

Teriamos este resultado ao usar o snippet:

```js
function(let x = valorUm, let y = valorDois, let r = operadorMatematico) {
    return x r y;
}
```

__Obs.: Funcão de exemplo, nem sei se este retorno vai funcionar__

Ao ser impresso podemos navegar pelos espacos reservados por meio da tecla **TAB** no teclado.

Outra coisa que podemos fazer é setar valores possiveis para que o usuario saiba o que inserir no espaco reservado.

```js
{
  "Nome do Snippet": {
    "prefix": ["acaoParaChamarX", "acao", "acaoPara", "X", "x"],
    "body": [
      "function(let x = ${1:valorUm}, let y = ${2:valorDois}, let r = ${0|+,-,*,/,%|}) {",
      "return x r y;",
      "}"
    ],
    "description": "Descricao do snippet que aparece na pesquisa."
  }
}
```

Sera impresso:
```js
function(let x = valorUm, let y = valorDois, let r = ${0|+,-,*,/,%|}) {
    return x r y;
}
```

Podemos inserir algumas variaveis dentro do body, onde estas imprimem valores definios.

Para usar uma variaveis da lista podemos declarar $nome ou ${nome:valor}, se a variavel nao esta definida seu padrão ou sequencia vazia é inserida, se ela é desconhecida um espaco reservado é criado.

Lista de variaveis possiveis:
- TM_SELECTED_TEXT: O texto atualmente selecionado ou a sequência vazia
- TM_CURRENT_LINE: O conteúdo da linha atual
- TM_CURRENT_WORD: O conteúdo da palavra sob o cursor ou a sequência vazia
- TM_LINE_INDEX: O número da linha baseada no índice zero
- TM_LINE_NUMBER: O número da linha com base em um índice
- TM_FILENAME: O nome do arquivo do documento atual
- TM_FILENAME_BASE: O nome do arquivo do documento atual sem suas extensões
- TM_DIRECTORY: O diretório do documento atual
- TM_FILEPATH: O caminho completo do arquivo do documento atual
- CLIPBOARD: O conteúdo da sua área de transferência
- WORKSPACE_NAME: O nome do espaço de trabalho ou da pasta aberta
- CURRENT_YEAR: O ano atual
- CURRENT_YEAR_SHORT: Os dois últimos dígitos do ano atual
- CURRENT_MONTH: O mês como dois dígitos ```'02'```
- CURRENT_MONTH_NAME: O nome completo do mês ```'julho'```
- CURRENT_MONTH_NAME_SHORT: O nome abreviado do mês ```'Jul'```
- CURRENT_DATE: O dia do mês
- CURRENT_DAY_NAME: O nome do dia ```'segunda-feira'```
- CURRENT_DAY_NAME_SHORT: O nome abreviado do dia ```'Seg'```
- CURRENT_HOUR: A hora atual no formato de relógio de 24 horas
- CURRENT_MINUTE: O minuto atual
- CURRENT_SECOND: O segundo atual
- CURRENT_SECONDS_UNIX: O número de segundos desde a época do Unix
- BLOCK_COMMENT_START: Exemplo de saída: em PHP ```/*``` ou HTML ```<!--```
- BLOCK_COMMENT_END: Exemplo de saída: em PHP ```*/``` ou HTML ```-->```
- LINE_COMMENT: Exemplo de saída: em PHP ```//``` ou HTML ```<!-- -->```


Este exemplo imprime ```<!-- Olá Devs -->```
```js
{
  "hello": {
    "prefix": "devs",
    "body": "$BLOCK_COMMENT_START Olá Devs $BLOCK_COMMENT_END"
  }
}
```

Caso tenhamos criado um snippet global ainda sim conseguimos delimitar para quais idiomas ele estara disponivel por meio do ```scope```.
```js
{
  "hello": {
    "scope": "javascript,php,html",
    "prefix": "devs",
    "body": "$BLOCK_COMMENT_START Olá Devs $BLOCK_COMMENT_END"
  }
}
```

O exemplos anterior só estara disponivel em arquivos js, php e html.

Isso é só o basico.