# Programacao


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

TIPOS

- Constantes
    - Constantes de ponto flutuante
    - Constantes Inteiras
    - HIGH ou LOW
    - INPUT, OUTPUT ou INPUT_PULLUP
    - LED_BUILTIN
    - true ou false
- Conversão
    - byte()
    - char()
    - float()
    - int()
    - long()
    - word()
- Tipo de dados
    - String
    - String()
    - array
    - bool
    - boolean
    - byte
    - char
    - double
    - float
    - int
    - long
    - short
    - unsigned char
    - unsigned int
    - unsigned long
    - void
    - word
- Variáveis de Escopo e Qualificadores
    - const
    - scope
    - static
    - volatile
- Utilitários
    - PROGMEM
    - sizeof()



Constantes
```js
/*

Descrição
    Semelhante a constantes inteiras, as constantes de ponto flutuante são usadas para tornar o código mais legível.
    Constantes de ponto flutuante são trocadas em tempo de compilação para o valor para o qual a expressão avalia.

Exemplo de código
    n = 0.005;

Notas e avisos
    As constantes de ponto flutuante também podem ser expressas em uma variedade de notação científica.
    'E' e 'e' são ambos aceitos como indicadores expoentes válidos.

    _______________________________________________________________________________
    constante de ponto flutuante   | 	avalia para     |    também avalia para
    -------------------------------|--------------------|--------------------------
        10,0                       |       10           |
                                   |                    |
        2.34E5                     |   2,34 * 10 ^ 5    |     234000
                                   |                    |
        67e-12                     |  67,0 * 10 ^ -12   |    0.000000000067
    _______________________________|____________________|__________________________
*/








// Constantes Inteiras
  Descrição
    Constantes inteiras são números que são usados ​​diretamente em um esboço, como 123.
    Por padrão, esses números são tratados como int, mas você pode alterar isso com os modificadores U e L (veja abaixo).

    Normalmente, constantes inteiras são tratadas como inteiros de base 10 (decimal), mas notações especiais (formatadores) podem ser usadas para inserir números em outras bases.

    _______________________________________________________________________________
      Base           | 	   Exemplo       |    Formatador       |    Comente
    -----------------|-------------------|---------------------|-------------------
      10 (decimal)   |     123           |  Nenhum             |
                     |                   |                     |
        2 (binário)  |   B1111011        |     levando 'B'     | só funciona com valores de 8 bits (0 a 255) caracteres 0 e 1 válidos
                     |                   |                     |
      8 (octal)      |      0173         |   levando "0"       | caracteres 0-7 válidos
                     |                   |                     |
    16 (hexadecimal) |     0x7B          |  levando "0x"       | caracteres 0-9, AF, af válido
    _________________|___________________|_____________________|___________________

  Decimal (base 10)
    Essa é a matemática do senso comum com a qual você está familiarizado. Constantes sem outros prefixos são assumidos como estando no formato decimal.

    Exemplo de código:
    n = 101; // same as 101 decimal ((1 * 10^2) + (0 * 10^1) + 1)

  Binário (base 2)
    Apenas os caracteres 0 e 1 são válidos.

    Exemplo de código:
    n = B101; // same as 5 decimal ((1 * 2^2) + (0 * 2^1) + 1)

    O formatador binário só funciona em bytes (8 bits) entre 0 (B0) e 255 (B11111111). Se for conveniente inserir um int (16 bits) em formato binário, você pode fazer um procedimento em duas etapas, como:

    myInt = (B11001100 * 256) + B10101010; // B11001100 is the high byte`


  Octal (base 8)
    Apenas os caracteres de 0 a 7 são válidos. Os valores octais são indicados pelo prefixo "0" (zero).

    Exemplo de código:
    n = 0101; // same as 65 decimal ((1 * 8^2) + (0 * 8^1) + 1)

    É possível gerar um erro difícil de encontrar (inadvertidamente) incluindo um zero à esquerda antes de uma constante e ter o compilador intencionalmente interpretando sua constante como octal.

  Hexadecimal (base 16)
    Os caracteres válidos são de 0 a 9 e letras de A a F; A tem o valor 10, B é 11, até F, que é 15. Os valores hexadecimais são indicados pelo prefixo "0x". Observe que o AF pode ser digitado em maiúscula ou minúscula (af).

    Exemplo de código:
    n = 0x101; // same as 257 decimal ((1 * 16^2) + (0 * 16^1) + 1)

  Notas e avisos
    Formatadores U & L:
    Por padrão, uma constante inteira é tratada como um int com as limitações de valores do atendente. Para especificar uma constante inteira com outro tipo de dados, siga com:
        um 'u' ou 'U' para forçar a constante em um formato de dados não assinado. Exemplo: 33u
        um 'l' ou 'L' para forçar a constante em um formato de dados longo. Exemplo: 100000L
        um 'ul' ou 'UL' para forçar a constante em uma constante longa sem sinal. Exemplo: 32767ul











// HIGH | LOW | INPUT | OUTPUT | INPUT_PULLUP | LED_BUILTIN | true | false
  Descrição
    Constantes são expressões predefinidas na linguagem Arduino. Eles são usados ​​para tornar os programas mais fáceis de ler. Nós classificamos constantes em grupos:

  Definindo níveis lógicos: true e false (constantes booleanas)
    Existem duas constantes usadas para representar a verdade e a falsidade na linguagem do Arduino: true e false .

    false
      false é o mais fácil dos dois para definir. false é definido como 0 (zero).

    true
      true é dito frequentemente para ser definido como 1, o que é correto, mas verdadeiro tem uma definição mais ampla. Qualquer inteiro que seja diferente de zero é verdadeiro, em um sentido booleano. Então -1, 2 e -200 são todos definidos como verdadeiros também, em um sentido booleano.

      Observe que as constantes true e false são digitadas em letras minúsculas, diferentemente de HIGH , LOW , INPUT e OUTPUT .

  Definindo Níveis de Pino: HIGH e LOW
    Ao ler ou gravar em um pino digital, existem apenas dois valores possíveis que um pino pode levar / definir como: HIGH e LOW .

    HIGH
      O significado de HIGH (em referência a um pino) é um pouco diferente, dependendo se um pino é definido como INPUT ou OUTPUT . Quando um pino é configurado como INPUT com pinMode () e lido com digitalRead () , o Arduino (ATmega) reportará HIGH se:

        - uma tensão maior que 3.0V está presente no pino (placas de 5V)
        - uma tensão maior que 2,0V volts está presente no pino (placas de 3,3V)

     Um pino também pode ser configurado como INPUT com pinMode() e, subsequentemente, feito HIGH com digitalWrite () . Isso habilitará os resistores internos de 20K, que puxarão o pino de entrada para uma leitura HIGH menos que seja puxado LOW por um circuito externo. É assim que o INPUT_PULLUP funciona e é descrito abaixo com mais detalhes.

     Quando um pino é configurado para OUTPUT com pinMode() e definido como HIGH com digitalWrite() , o pino está em:

        - 5 volts (placas de 5V)
        - 3,3 volts (placas de 3,3V)

      Neste estado, ele pode fornecer corrente, por exemplo, acender um LED conectado através de um resistor em série ao terra.

    LOW
      O significado de LOW também tem um significado diferente, dependendo de se um pino está definido como INPUT ou OUTPUT . Quando um pino é configurado como um INPUT com pinMode() e lido com digitalRead() , o Arduino (ATmega) reportará LOW se:

        - uma tensão menor que 1,5V está presente no pino (placas de 5V)
        - uma voltagem menor que 1,0V (Aprox) está presente no pino (placas de 3,3V)

      Quando um pino é configurado para OUTPUT com o pinMode() e definido como LOW com digitalWrite() , o pino está em 0 volts (placas de 5V e 3.3V). Neste estado, pode afundar a corrente, por exemplo, acender um LED ligado através de um resistor em série a +5 volts (ou +3,3 volts).

  Definindo os modos de pinos digitais: INPUT, INPUT_PULLUP e OUTPUT
    Pinos digitais podem ser usados ​​como INPUT , INPUT_PULLUP ou OUTPUT . Alterar um pino com pinMode() altera o comportamento elétrico do pino.

    Pins configurados como INPUT
      Os pinos do Arduino (ATmega) configurados como INPUT com o pinMode() são considerados em um estado de alta impedância . Pinos configurados como INPUT fazem demandas extremamente pequenas no circuito que estão amostrando, equivalente a um resistor em série de 100 Megohms na frente do pino. Isso os torna úteis para ler um sensor.

      Se você tiver o pin configurado como INPUT e estiver lendo um switch, quando o switch estiver no estado aberto, o pino de entrada ficará "flutuante", resultando em resultados imprevisíveis. Para garantir uma leitura adequada quando o interruptor estiver aberto, um resistor de pull-up ou pull-down deve ser usado. O propósito deste resistor é puxar o pino para um estado conhecido quando o interruptor estiver aberto. Um resistor de 10 K ohms é geralmente escolhido, pois é um valor baixo o suficiente para impedir uma entrada flutuante e, ao mesmo tempo, um valor alto o suficiente para não atrair muita corrente quando o comutador é fechado. Veja o tutorial Digital Read Serial (https://www.arduino.cc/en/Tutorial/DigitalReadSerial)para mais informações.

      Se um resistor pull-down for usado, o pino de entrada será LOW quando o interruptor estiver aberto e HIGH quando o interruptor estiver fechado.

      Se um resistor pull-up for usado, o pino de entrada será HIGH quando o interruptor estiver aberto e LOW quando o interruptor estiver fechado.

    Pins configurados como INPUT_PULLUP
      O microcontrolador ATmega no Arduino possui resistores pull-up internos (resistores que se conectam à energia internamente) que você pode acessar. Se você preferir usá-los em vez de resistores pull-up externos, você pode usar o argumento pinMode() em pinMode() .

      Veja o tutorial Serial Input Pullup (https://www.arduino.cc/en/Tutorial/InputPullupSerial) para um exemplo disso em uso.

      Os pinos configurados como entradas com INPUT ou INPUT_PULLUP podem ser danificados ou destruídos se estiverem conectados a tensões abaixo do solo (voltagens negativas) ou acima do barramento de alimentação positivo (5V ou 3V).

  Pins configurados como OUTPUT
    Pinos configurados como OUTPUT com o pinMode() são considerados em estado de baixa impedância . Isso significa que eles podem fornecer uma quantidade substancial de corrente para outros circuitos. Os pinos ATmega podem fornecer fonte (fornecer corrente) ou dissipar (absorver corrente) até 40 mA (miliamperes) de corrente para outros dispositivos / circuitos. Isso os torna úteis para alimentar LEDs porque os LEDs normalmente usam menos de 40 mA. Cargas maiores que 40 mA (por exemplo, motores) exigirão um transistor ou outro circuito de interface.

    Os pinos configurados como saídas podem ser danificados ou destruídos se estiverem conectados a trilhos de energia aterrados ou positivos.

  Definindo internos: LED_BUILTIN
    A maioria das placas Arduino tem um pino conectado a um LED on-board em série com um resistor. A constante LED_BUILTIN é o número do pino ao qual o LED on-board está conectado. A maioria das placas tem esse LED conectado ao pino digital 13.

```


















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


## Funcao


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