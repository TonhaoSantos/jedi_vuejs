# Arduino

## Alimentar
Para alimentar o arduino podemos fazer das seguintes formas (7v até 12v):

- Cabo USB
- Bateria
- Pino VIM
- Carregador (9v é o ideal)

O arduino 


## Funcao F
Sempre que tiver texto é bom usar esta funcao F.

Ele transforma a variavel em um ponteiro que vai ficar apontando para o endereco do texto na memoria flash junto com o programa feito, quando ele for mostrar a informacao chama apenas pelo endereco e mostra o conteudo.

Desta forma torna o programa mais leve.

```js
String msg;

void setup () {
    msg = f("alguma cosia");

    Serial.begin(9600);
}

void loop() {
    Serial.println(msg);
    delay(5000);
}
```

## Comunicacao Serial
É usada para enviar informacao e receber informacao.

O arduino uno utiliza as portas 0 e 1 como comunicacao serial.

Esta porta nos permite conectar o arduino com outros arduinos e outros equipamentos que tenham comunicao serial.

A comunicao tambem é feita por meio do cabo usb e se estiver conectado é recomendado nao utilizar as portas 0 e 1 para mais nada pois ela fica exclusiva para comunicao serial.

```js
void setup() {
    // Comeca a comunicao via serial (Inicia a comunicacao serial)
    Serial.begin(9600);

    // Enviando uma msg via serial do arduino para o monitor serial
    Serial.print("Teste");
}

void loop() {

}
```

## Variaveis
Uma variável é um local para armazenar um dado, possui um nome, um valor e um tipo.

Por exemplo, esta declaração:

```js
int pinoLed = 6;
```

Criamos uma variável com nome pinoLed, valor 6 e tipo é int.

Podemos ao longo do programa chamar/referenciar esta variavel.

Por exemplo, nesta declaração:

```js
pinMode(pinoLed, OUTPUT);
```

Estamos pegando o valor do pino que é **6** e passando para a função **pinMode()**.

Para este exemplo não é obrigatorio usar uma variavel, mas fica mais facil manter o codico centralizando em apenas um local se precisarmos alterar o valor da porta futuramente.


Se no decorrer do codigo precisarmos alterar o valor da variavel podemos fazer da seguinte forma sem precisar passar novamente o tipo (não pode ser alterado).

```js
int pinoLed = 2;
```

Mudamos o valor da porta para 2. Importante informar que só podemos alterar o valor desta forma já tendo declarada ela anteriormente no programa.

Se alterar o valor antes de declar a variavel receberemos um erro.

Podemos atribuir ouma variavel a outra:

```js
int pino1 = 13;
int pino2 = pino1;
pino1 = 12;
```

Fazendo isso somente pino1 tem seu valor alterado para 12, o pino2 continua como 13.

As variaveis possuem escopo de declaracao.

Entao se quisermos declarar ela globalmente temos que declarar antes de tudo:

```js
// Globalmente
int pino = 13;

void setup ()
{
    pinMode (pino, OUTPUT);
}

void loop()
{
    digitalWrite (pino, HIGH);
}
```

Declarando o a variavel pino globalmente, tanto **setup** quanto **loop** referenciam ela de modo que alterá-la afetará o valor que ela tem no outro, como em:

```js
// Globalmente
int pino = 13;

void setup ()
{
    // Alterando o valor
    // no LOOP agora vai ser 5
    pino = 5;
    pinMode (pino, OUTPUT);
}

void loop()
{
    digitalWrite (pino, HIGH);
}
```

Caso nao queira uma variavel com escopo global podemos declara-la na funcao que desejamos a mesma e seu escopo sera limitado a essa funcao.

```js
// Globalmente
int pino = 13;

void setup ()
{
    // Alterando a variavel global
    pino = 5;

    // Declarando uma com escopo local
    // o LOOP nao vai ter acesso
    int pinoLed = 2;


    pinMode (pino, OUTPUT);
    pinMode (pinoLed, OUTPUT);
}

void loop()
{
    digitalWrite (pino, HIGH);

    // Vai dar erro pois nao existe globalmente, somente no SETUP
    digitalWrite (pinoLed, HIGH);
}
```

PQ nao fazer todas as variaveis globais ja que pode dar erros deste tipo e eu nao sei onde vou usar uma variavel ou outro no meu codigo?

Uma resposta simples seria pelo fato de uma variavel global poder sofrer alteracao em qualquer quer lugar do codigo, assim vc acaba perdendo o controle de onde pode ter acontecido algum erro. Agora se vc entende todo o seu programa e garante que nao vai ter mutacao siga em frente e manda global.

Mas uma coisa é calara, se a variável tiver um valor que você não esperava podemos descobrir facil de onde veio o valor se a variável tiver um escopo limitado.





| Numeros inteiros | Espaco Memoria    | Faixa de valores |
|------------------|-------------------|---------|
| byte		       | 8 bits  (1 byte)  | 0 até 255 |
| int		       | 16 bits (2 bytes) | -32.768 até 32.767 |
| unsigned int	   | 16 bits (2 bytes) | 0 até 65.535 |
| word		       | 16 bits (2 bytes) | 0 até 65.535 |
| long		       | 32 bits (4 bytes) | -2.147.483.648 até 2.147.483.647 |
| unsigned long	   | 32 bits (4 bytes) | 0 até 4.294.967.295 |
| short		       | 16 bits (2 bytes) | -32.768 até 32.767 |

<br>

| Numeros Decimais | Espaco Memoria     | Faixa de valores                 | Pontos flutuantes |
|------------------|--------------------|----------------------------------|-------------------|
| float		       | 32 bits (4 bytes)	| -3,4028235E+38 até 3,4028235E+38 | 6-7 decimal digits |
| double		   | 32 bits (4 bytes)	| -3,4028235E+38 até 3,4028235E+38 | 6-7 decimal digits |

<br>

| True ou Falso | Espaco Memoria    | Faixa de valores |
|---------------|-------------------|------------------|
| boolean		| 8 bits (1 byte)	| true or false    |

<br>

| Texto         | Espaco Memoria    | Faixa de valores |
|---------------|-------------------|------------------|
| char		    | 8 bits (1 byte)	| -128 até 127     |
| unsigned char	| 8 bits (1 byte)	| 0 até 255        |
| String		| flexível		    | flexível         |

## Array


## Millis e Delay


##