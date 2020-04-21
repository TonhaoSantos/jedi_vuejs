# Programacao
**99.9% do conteudo desta pagiana é traducao da pagina do [arduino](https://www.arduino.cc/reference/en), quando sai compilando este conteudo nao tinha uma traducao muito definida no site, dai usei o google tradutor e copiei para um bloco de notas gigante que agora esta aqui**

**O intuido deste conteudo não é roubar o direitos dos seus donos, mas sim para facilitar a minha busca, visto que este site é um cookbook para minhas consultas.**

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
    - F
    - sizeof()


Constantes
```js
/*
Constantes de ponto flutuante

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


/*
Constantes Inteiras

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

*/


/*
HIGH | LOW | INPUT | OUTPUT | INPUT_PULLUP | LED_BUILTIN | true | false
  
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
*/
```



Tipo de dados
```js
/*
String
  Descrição
    Cadeias de texto podem ser representadas de duas maneiras. você pode usar o tipo de dados String, que faz parte do núcleo a partir da versão 0019, ou pode criar uma String fora de uma matriz do tipo char e terminá-la com um caractere nulo. Esta página descreveu o último método. Para obter mais detalhes sobre o objeto String, que oferece mais funcionalidades com o custo de mais memória, consulte a página do objeto String .

  Sintaxe
    Todos os itens a seguir são declarações válidas para Strings.
    char Str1[15];
    char Str2[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o'};
    char Str3[8] = {'a', 'r', 'd', 'u', 'i', 'n', 'o', '\0'};
    char Str4[ ] = "arduino";
    char Str5[8] = "arduino";
    char Str6[15] = "arduino";

  Possibilidades para declarar Strings
    - Declare uma matriz de caracteres sem inicializá-lo como em Str1
    - Declare uma matriz de chars (com um caractere extra) e o compilador adicionará o caractere nulo requerido, como em Str2
    - Adicione explicitamente o caractere nulo, Str3
    - Inicialize com uma constante String entre aspas; o compilador irá dimensionar a matriz para ajustar a constante String e um caractere nulo de terminação, Str4
    - Inicialize a matriz com um tamanho explícito e uma constante String, Str5
    - Inicialize o array, deixando espaço extra para um String maior, Str6

  Terminação nula (null)
    Geralmente, as Strings são terminadas com um caractere nulo (código ASCII 0). Isso permite que funções (como Serial.print() ) Serial.print() onde está o final de uma String. Caso contrário, eles continuariam lendo bytes subseqüentes de memória que não fazem parte da String.

    Isso significa que sua String precisa ter espaço para mais um caractere do que o texto que você deseja conter. É por isso que Str2 e Str5 precisam ter oito caracteres, apesar de "arduino" ter apenas sete - a última posição é preenchida automaticamente com um caractere nulo. Str4 será automaticamente dimensionado para oito caracteres, um para o nulo extra. Na Str3, incluímos explicitamente o caractere nulo (escrito '\ 0').

    Observe que é possível ter uma String sem um caractere nulo final (por exemplo, se você tivesse especificado o comprimento de Str2 como sete em vez de oito). Isso vai quebrar a maioria das funções que usam Strings, então você não deve fazê-lo intencionalmente. Se você notar algo se comportando de forma estranha (operando em caracteres que não estão na String), no entanto, esse pode ser o problema.

  Aspas simples ou aspas duplas?
    As strings são sempre definidas entre aspas duplas ("Abc") e os caracteres são sempre definidos entre aspas simples ('A').

  Envolvendo strings longas
    Você pode envolver longas seqüências de caracteres como esta:

    char myString[] = "This is the first line"
    " this is the second line"
    " etcetera";

  Matrizes de string
    Muitas vezes é conveniente, ao trabalhar com grandes quantidades de texto, como um projeto com um display LCD, configurar uma matriz de Strings. Como as próprias Strings são matrizes, isso é na verdade um exemplo de uma matriz bidimensional.

    No código abaixo, o asterisco após o char dados char “char *” indica que essa é uma matriz de “ponteiros”. Todos os nomes de matriz são, na verdade, ponteiros, portanto, isso é necessário para criar uma matriz de matrizes. Os ponteiros são uma das partes mais esotéricas de C para os iniciantes entenderem, mas não é necessário entender os ponteiros detalhadamente para usá-los efetivamente aqui.

  Exemplo de código
    char* myStrings[]={"This is String 1", "This is String 2", "This is String 3",
    "This is String 4", "This is String 5","This is String 6"};

    void setup(){
    Serial.begin(9600);
    }

    void loop(){
    for (int i = 0; i < 6; i++){
       Serial.println(myStrings[i]);
       delay(500);
       }
    }
*/


/*
String()
  Descrição
    Constrói uma instância da classe String. Existem várias versões que constroem Strings a partir de diferentes tipos de dados (isto é, formatam-nas como sequências de caracteres), incluindo:
      - uma string constante de caracteres, entre aspas duplas (ou seja, uma matriz char)
      - um único caracter constante, entre aspas simples
      - outra instância do objeto String
      - um inteiro constante ou um inteiro longo
      - um inteiro constante ou inteiro longo, usando uma base especificada
      - uma variável inteira ou inteira longa
      - uma variável inteira ou inteira longa, usando uma base especificada
      - um float ou double, usando casas decimais

    Construir um String a partir de um número resulta em uma string que contém a representação ASCII desse número. O padrão é base dez, então

      String thisString = String(13);
    te dá a String "13". Você pode usar outras bases, no entanto. Por exemplo,

      String thisString = String(13, HEX);

    dá-lhe a String "D", que é a representação hexadecimal do valor decimal 13. Ou se você preferir binário,

      String thisString = String(13, BIN);

    lhe dá a String "1101", que é a representação binária de 13.

  Sintaxe
    String(val)
    String(val, base)
    String(val, decimalPlaces)

  Parâmetros
    val : uma variável para formatar como uma String - Tipos de dados permitidos: string, char, byte, int, longo, unsigned int, unsigned long, float, double

    base (opcional): a base na qual formatar um valor decimalPlaces integrais ( somente se val for float ou double ): as casas decimais desejadas

  Retorna
    uma instância da classe String.

  Exemplo de código
    Todos os itens a seguir são declarações válidas para Strings.

    String stringOne = "Hello String";                       // using a constant String
    String stringOne =  String('a');                         // converting a constant char into a String
    String stringTwo =  String("This is a string");          // converting a constant string into a String object
    String stringOne =  String(stringTwo + " with more");    // concatenating two strings
    String stringOne =  String(13);                          // using a constant integer
    String stringOne =  String(analogRead(0), DEC);          // using an int and a base
    String stringOne =  String(45, HEX);                     // using an int and a base (hexadecimal)
    String stringOne =  String(255, BIN);                    // using an int and a base (binary)
    String stringOne =  String(millis(), DEC);               // using a long and a base
    String stringOne =  String(5.698, 3);                    // using a float and the decimal places
*/


/*
array
  Descrição
    Uma matriz é uma coleção de variáveis ​​que são acessadas com um número de índice. Os arrays na linguagem de programação C, nos quais o Arduino se baseia, podem ser complicados, mas o uso de arrays simples é relativamente simples.

  Criando (declarando) uma matriz
    Todos os métodos abaixo são formas válidas de criar (declarar) uma matriz.
      int myInts[6];
      int myPins[] = {2, 4, 8, 3, 6};
      int mySensVals[6] = {2, 4, -8, 3, 2};
      char message[6] = "hello";

    Você pode declarar um array sem inicializá-lo como em myInts.
    Em myPins, declaramos um array sem escolher explicitamente um tamanho. O compilador conta os elementos e cria uma matriz do tamanho apropriado.
    Finalmente, você pode inicializar e dimensionar sua matriz, como em mySensVals. Observe que ao declarar uma matriz do tipo char, um elemento a mais do que sua inicialização é necessário, para manter o caractere nulo necessário.

  Acessando uma Matriz
    Arrays são zero indexados, isto é, referindo-se à inicialização do array acima, o primeiro elemento do array está no índice 0, daí

      mySensVals[0] == 2, mySensVals[1] == 4, e assim por diante.

    Isso também significa que, em uma matriz com dez elementos, o índice nove é o último elemento. Conseqüentemente:

      int myArray[10]={9,3,2,4,3,2,7,8,9,11};
           // myArray[9]    contains 11
           // myArray[10]   is invalid and contains random information (other memory address)

    Por esse motivo, você deve ter cuidado ao acessar matrizes. Acessar passado o final de uma matriz (usando um número de índice maior que seu tamanho de matriz declarado - 1) está lendo da memória que está em uso para outros fins. A leitura desses locais provavelmente não fará muito, exceto produzir dados inválidos. Escrever em locais de memória aleatória é definitivamente uma má ideia e pode levar a resultados infelizes, como falhas ou mau funcionamento do programa. Isso também pode ser um erro difícil de rastrear.

    Ao contrário do BASIC ou do JAVA, o compilador C não verifica se o acesso à matriz está dentro dos limites legais do tamanho da matriz que você declarou.

  Para atribuir um valor a uma matriz:

    mySensVals[0] = 10;

 Para recuperar um valor de uma matriz:

   x = mySensVals[4];

 Arrays e FOR Loops
  Os arrays são geralmente manipulados dentro de loops for, onde o contador de loops é usado como o índice para cada elemento do array. Por exemplo, para imprimir os elementos de um array sobre a porta serial, você poderia fazer algo assim:
   int i;
   for (i = 0; i < 5; i = i + 1) {
     Serial.println(myPins[i]);
   }
*/


/*
bool
  Descrição
    Um bool contém um dos dois valores, true ou false . (Cada variável bool ocupa um byte de memória.)

  Exemplo de código
    Este código mostra como usar o tipo de dados bool .

    int LEDpin = 5;       // LED on pin 5
    int switchPin = 13;   // momentary switch on 13, other side connected to ground

    bool running = false;

    void setup()
    {
      pinMode(LEDpin, OUTPUT);
      pinMode(switchPin, INPUT);
      digitalWrite(switchPin, HIGH);      // turn on pullup resistor
    }

    void loop()
    {
      if (digitalRead(switchPin) == LOW)
      {  // switch is pressed - pullup keeps pin high normally
        delay(100);                        // delay to debounce switch
        running = !running;                // toggle running variable
        digitalWrite(LEDpin, running);     // indicate via LED
      }
    }
*/


/*
boolean
  Descrição
    boolean é um alias de tipo não padrão para bool definido pelo Arduino. É recomendado usar o tipo padrão bool , que é idêntico.
*/


/*
byte
  Descrição
    Um byte armazena um número não assinado de 8 bits, de 0 a 255.
*/


/*
char
  Descrição
    Um tipo de dados que ocupa 1 byte de memória que armazena um valor de caractere. Literais de caracteres são escritos em aspas simples, como esta: 'A' (para vários caracteres - strings - use aspas duplas: "ABC").

    Personagens são armazenados como números no entanto. Você pode ver a codificação específica no gráfico ASCII . Isso significa que é possível fazer aritmética em caracteres, nos quais o valor ASCII do caractere é usado (por exemplo, 'A' + 1 tem o valor 66, já que o valor ASCII da letra maiúscula A é 65). Veja a referência Serial.println para saber mais sobre como os caracteres são traduzidos em números.

    O tipo de dados char é um tipo assinado, o que significa que ele codifica números de -128 a 127. Para um tipo de dados não assinado, de um byte (8 bits), use o tipo de dados de byte .

  Exemplo de código
    char myChar = 'A';
    char myChar = 65;      // both are equivalent
*/


/*
double
  Descrição
    Número de ponto flutuante de precisão dupla. No Uno e em outras placas baseadas em ATMEGA, isso ocupa 4 bytes. Ou seja, a implementação dupla é exatamente igual ao float, sem ganho de precisão.

    No Arduino Due, os duplos têm precisão de 8 bytes (64 bits).

  Notas e avisos
    Usuários que emprestam código de outras fontes que incluem variáveis ​​duplas podem querer examinar o código para ver se a precisão implícita é diferente daquela realmente alcançada em Arduinos baseados em ATMEGA.
*/


/*
float
  Descrição
    Tipo de dados para números de ponto flutuante, um número que possui um ponto decimal. Os números de ponto flutuante são freqüentemente usados ​​para aproximar valores analógicos e contínuos, porque eles têm uma resolução maior do que os inteiros. Os números de ponto flutuante podem ser tão grandes quanto 3.4028235E + 38 e tão baixos quanto -3.4028235E + 38. Eles são armazenados como 32 bits (4 bytes) de informação.

    Os flutuadores têm apenas 6-7 dígitos decimais de precisão. Isso significa o número total de dígitos, não o número à direita do ponto decimal. Ao contrário de outras plataformas, onde você pode obter mais precisão usando um double (por exemplo, até 15 dígitos), no Arduino, o dobro é do mesmo tamanho que o float.

    Números de pontos flutuantes não são exatos e podem produzir resultados estranhos quando comparados. Por exemplo, 6.0 / 3.0 pode não ser igual a 2.0. Você deve, em vez disso, verificar que o valor absoluto da diferença entre os números é menor do que um pequeno número.

    A matemática do ponto flutuante também é muito mais lenta que a matemática inteira na execução de cálculos; portanto, deve ser evitada se, por exemplo, um loop precisar ser executado na velocidade máxima para uma função de temporização crítica. Os programadores costumam fazer alguns ajustes para converter cálculos de ponto flutuante em matemática inteira para aumentar a velocidade.

    Se estiver fazendo matemática com floats, você precisa adicionar um ponto decimal, caso contrário, ele será tratado como um int. Veja a página de constantes do ponto flutuante para detalhes.

  Sintaxe
    float var=val;

    var - o nome da variável float val - o valor atribuído a essa variável

  Exemplo de código
    float myfloat;
    float sensorCalbrate = 1.117;

    int x;
    int y;
    float z;

    x = 1;
    y = x / 2;            // y now contains 0, ints can't hold fractions
    z = (float)x / 2.0;   // z now contains .5 (you have to use 2.0, not 2)
*/


/*
int
  Descrição
    Os inteiros são o seu tipo de dados principal para armazenamento numérico.

    No Arduino Uno (e em outras placas baseadas no ATmega), um int armazena um valor de 16 bits (2 bytes). Isso produz um intervalo de -32.768 a 32.767 (valor mínimo de -2 ^ 15 e um valor máximo de (2 ^ 15) - 1). Nas placas baseadas em Arduino Due e SAMD (como MKR1000 e Zero), um int armazena um valor de 32 bits (4 bytes). Isto produz um intervalo de -2,147,483,648 a 2,147,483,647 (valor mínimo de -2 ^ 31 e um valor máximo de (2 ^ 31) - 1).

    int armazena números negativos com uma técnica chamada ( complemento de matemática 2 ). O bit mais alto, às vezes referido como o bit "sinal", sinaliza o número como um número negativo. O resto dos bits são invertidos e 1 é adicionado.

    O Arduino cuida de lidar com números negativos para você, para que as operações aritméticas funcionem de maneira transparente da maneira esperada. Pode haver uma complicação inesperada ao lidar com o operador direito bitshift (>>).

  Sintaxe
    int var = val;

    var - o nome da sua variável int
    val - o valor atribuído a essa variável

  Exemplo de código

     int ledPin = 13;

  Notas e avisos
    Quando variáveis ​​assinadas são feitas para exceder sua capacidade máxima ou mínima, elas transbordam.
    O resultado de um estouro é imprevisível, portanto, isso deve ser evitado. Um sintoma típico de um estouro é a variável "rolando" de sua capacidade máxima para seu mínimo ou vice-versa, mas nem sempre é esse o caso. Se você quiser esse comportamento, use int não assinado 'unsigned int'.
*/


/*
long
  Descrição
    Variáveis ​​longas são variáveis ​​de tamanho estendido para armazenamento numérico e armazenam 32 bits (4 bytes), de -2.147.483.648 a 2.147.483.647.

    Se estiver fazendo matemática com números inteiros, pelo menos um dos números deve ser seguido por um L, forçando-o a ser um longo. Veja a página Integer Constants para detalhes.

  Sintaxe
    long var = val;

    var - o nome da variável longa val - o valor atribuído à variável

  Exemplo de código
    long speedOfLight = 186000L;   // see the Integer Constants page for explanation of the 'L'
*/


/*
short
  Descrição
    Um curto é um tipo de dados de 16 bits.

    Em todos os Arduinos (baseados em ATMega e ARM), um short armazena um valor de 16 bits (2 bytes). Isso produz um intervalo de -32.768 a 32.767 (valor mínimo de -2 ^ 15 e um valor máximo de (2 ^ 15) - 1).

  Sintaxe
    short var = val;

    var - seu nome de variável curto val - o valor atribuído a essa variável

  Exemplo de código
   short ledPin = 13
*/


/*
unsigned char
  Descrição
    Um tipo de dados não assinado que ocupa 1 byte de memória. O mesmo que o tipo de dados de byte .

    O tipo de dados char sem assinatura codifica números de 0 a 255.

    Para consistência do estilo de programação do Arduino, o tipo de dados de byte deve ser preferido.

  Exemplo de código
    unsigned char myChar = 240;
*/


/*
unsigned int
  Descrição
    No Uno e em outras placas baseadas em ATMEGA, ints não assinados (inteiros sem sinal) são os mesmos que ints em que armazenam um valor de 2 bytes. Em vez de armazenar números negativos, eles armazenam apenas valores positivos, gerando um intervalo útil de 0 a 65.535 ((2 ^ 16) - 1).

    O Due armazena um valor de 4 bytes (32 bits), variando de 0 a 4.294.967.295 (2 ^ 32 - 1).

    A diferença entre ints não assinados e ints (assinados) reside na maneira como o bit mais alto, às vezes chamado de bit "sinal", é interpretado. No tipo int do Arduino (que é assinado), se o bit alto for um "1", o número é interpretado como um número negativo e os outros 15 bits são interpretados com ( complemento de matemática 2 ).

  Sintaxe
    unsigned int var = val; var - seu nome de variável int não assinado val - o valor atribuído a essa variável

  Exemplo de código
    unsigned int ledPin = 13;
*/


/*
unsigned long
  Descrição
    Variáveis ​​longas não assinadas são variáveis ​​de tamanho estendidas para armazenamento numérico e armazenam 32 bits (4 bytes). Ao contrário dos longos padrão, os longos não assinados não armazenam números negativos, variando de 0 a 4.294.967.295 (2 ^ 32 - 1).

  Sintaxe
    unsigned long var = val;

    var - seu nome de variável longo val - o valor atribuído a essa variável

  Exemplo de código
    unsigned long time;

    void setup()
    {
      Serial.begin(9600);
    }

    void loop()
    {
      Serial.print("Time: ");
      time = millis();
      //prints time since program started
      Serial.println(time);
      // wait a second so as not to send massive amounts of data
      delay(1000);
    }
*/


/*
void
  Descrição
    A palavra-chave void é usada apenas em declarações de função. Indica que a função deve retornar nenhuma informação para a função da qual foi chamada.

  Exemplo de código
    O código mostra como usar void .
      // actions are performed in the functions "setup" and "loop"
      // but  no information is reported to the larger program

      void setup()
      {
        // ...
      }

      void loop()
      {
        // ...
      }
*/


/*
word
  Descrição
    Uma palavra armazena um número não assinado de 16 bits, de 0 a 65535. Igual a um int não assinado.
    Exemplo de código

    word w = 10000;
*/
```


Conversão
```js
/*
byte()
  Descrição
    Converte um valor para o tipo de dados de byte .

  Sintaxe
    byte(x)

  Parâmetros
    x : um valor de qualquer tipo

  Retorna
    byte
*/


/*
char()
  Descrição
    Converte um valor para o tipo de dados char .

  Sintaxe
    char(x)

  Parâmetros
    x : um valor de qualquer tipo

  Retorna
    char
*/


/*
float()
  Descrição
    Converte um valor para o tipo de dados flutuante .

  Sintaxe
    float(x)

  Parâmetros
    x : um valor de qualquer tipo

  Retorna
    float

  Notas e avisos
    Veja a referência para float para detalhes sobre a precisão e limitações dos números de ponto flutuante no Arduino.
*/


/*
int()
  Descrição
    Converte um valor para o tipo de dados int .

  Sintaxe
    int(x)

  Parâmetros
    x : um valor de qualquer tipo

  Retorna
    int
*/


/*
long()
  Descrição
    Converte um valor para o tipo de dados longo .

  Sintaxe
    long(x)

  Parâmetros
    x : um valor de qualquer tipo

  Retorna
    long
*/


/*
word()
  Descrição
    Converte um valor para o tipo de dados da palavra .

  Sintaxe
    word(x)
    word(h, l)

  Parâmetros
    x : um valor de qualquer tipo
    h : o byte de alta ordem (mais à esquerda) da palavra
    l : o byte de baixa ordem (mais à direita) da palavra

  Retorna
    word
*/
```

Variáveis de Escopo e Qualificadores
```js
/*
const
  Descrição
    A palavra-chave const significa constante. É um qualificador de variável que modifica o comportamento da variável, tornando uma variável " somente leitura ". Isso significa que a variável pode ser usada como qualquer outra variável do seu tipo, mas seu valor não pode ser alterado. Você receberá um erro do compilador se tentar atribuir um valor a uma variável const .
    As constantes definidas com a palavra-chave const obedecem às regras de definição de variáveis que governam outras variáveis. Isso, e as armadilhas de usar #define , tornam a palavra-chave const um método superior para definir constantes e é preferível ao uso de #define .

  Notas e avisos
    #define ou const
    Você pode usar const ou #define para criar constantes numéricas ou de string.
    Para matrizes , você precisará usar const.
    Em geral, const é preferível ao #define para definir constantes.

  Exemplo de código
    const float pi = 3.14;
    float x;

    // ....

    x = pi * 2;    // it's fine to use consts in math

    pi = 7;        // illegal - you can't write to (modify) a constant
*/


/*
scope
  Descrição
    Variáveis ​​na linguagem de programação C, que o Arduino usa, possuem uma propriedade chamada escopo.
    Isto está em contraste com as primeiras versões de linguagens como o BASIC, onde cada variável é uma variável global .

    Uma variável global é aquela que pode ser vista por todas as funções de um programa.
    Variáveis ​​locais são visíveis apenas para a função na qual elas são declaradas. No ambiente do Arduino, qualquer variável declarada fora de uma função (por exemplo, setup (), loop (), etc.), é uma variável global .

    Quando os programas começam a ficar maiores e mais complexos, as variáveis ​​locais são uma maneira útil de garantir que apenas uma função tenha acesso às suas próprias variáveis. Isso evita erros de programação quando uma função inadvertidamente modifica variáveis ​​usadas por outra função.

    Às vezes também é útil declarar e inicializar uma variável dentro de um loop for.
    Isso cria uma variável que só pode ser acessada de dentro dos colchetes de loop.

  Exemplo de código
    int gPWMval;  // any function will see this variable

    void setup()
    {
      // ...
    }

    void loop()
    {
      int i;    // "i" is only "visible" inside of "loop"
      float f;  // "f" is only "visible" inside of "loop"
      // ...

      for (int j = 0; j <100; j++){
      // variable j can only be accessed inside the for-loop brackets
      }

    }
*/


/*
static
  Descrição
    A palavra-chave static é usada para criar variáveis ​​visíveis apenas para uma função.
    No entanto, ao contrário das variáveis ​​locais que são criadas e destruídas toda vez que uma função é chamada, as variáveis ​​estáticas persistem além da chamada de função, preservando seus dados entre as chamadas de função.

    Variáveis ​​declaradas como estáticas somente serão criadas e inicializadas na primeira vez que uma função for chamada.

  Exemplo de código
    // RandomWalk
    * Paul Badger 2007
    * RandomWalk wanders up and down randomly between two
    * endpoints. The maximum move in one loop is governed by
    * the parameter "stepsize".
    * A static variable is moved up and down a random amount.
    * This technique is also known as "pink noise" and "drunken walk".
    //

    #define randomWalkLowRange -20
    #define randomWalkHighRange 20
    int stepsize;

    int thisTime;
    int total;

    void setup()
    {
      Serial.begin(9600);
    }

    void loop()
    {        //  test randomWalk function
      stepsize = 5;
      thisTime = randomWalk(stepsize);
      Serial.println(thisTime);
       delay(10);
    }

    int randomWalk(int moveSize){
      static int  place;     // variable to store value in random walk - declared static so that it stores
                             // values in between function calls, but no other functions can change its value

      place = place + (random(-moveSize, moveSize + 1));

      if (place < randomWalkLowRange){                              // check lower and upper limits
        place = randomWalkLowRange + (randomWalkLowRange - place);  // reflect number back in positive direction
      }
      else if(place > randomWalkHighRange){
        place = randomWalkHighRange - (place - randomWalkHighRange);  // reflect number back in negative direction
      }

      return place;
    }
*/


/*
volatile
  Descrição
    volatile é uma palavra-chave conhecida como um qualificador de variável, geralmente é usada antes do tipo de dado de uma variável, para modificar a maneira como o compilador e o programa subsequente tratam a variável.

    Declarar uma variável volátil é uma diretiva para o compilador. O compilador é um software que traduz seu código C / C ++ para o código da máquina, que são as instruções reais para o chip Atmega no Arduino.

    Especificamente, ele direciona o compilador para carregar a variável da RAM e não de um registrador de armazenamento, que é um local de memória temporária onde as variáveis ​​do programa são armazenadas e manipuladas. Sob certas condições, o valor de uma variável armazenada nos registros pode ser impreciso.

    Uma variável deve ser declarada volátil sempre que seu valor puder ser alterado por algo além do controle da seção de código na qual ela aparece, como um encadeamento em execução concorrente. No Arduino, o único local onde isso é provável é em seções de código associadas a interrupções, chamadas de rotina de serviço de interrupção.

  int ou voláteis longos
    Se a variável volátil for maior que um byte (por exemplo, um int de 16 bits ou um comprimento de 32 bits), o microcontrolador não poderá lê-lo em um passo, porque é um microcontrolador de 8 bits. Isto significa que, enquanto a sua seção de código principal (por exemplo, o seu loop) lê os primeiros 8 bits da variável, a interrupção pode já alterar os segundos 8 bits. Isso produzirá valores aleatórios para a variável.

    Remédio:
      Enquanto a variável é lida, as interrupções precisam ser desabilitadas, para que não possam mexer com os bits, enquanto são lidos. Existem várias maneiras de fazer isso:
        1. LÍNGUA noInterrupts (Função)
        2. use a macro ATOMIC_BLOCK. Operações atômicas são operações de MCU únicas - a menor unidade possível.

  Exemplo 1
    // toggles LED when interrupt pin changes state
    int pin = 13;
    volatile byte state = LOW;

    void setup()
    {
      pinMode(pin, OUTPUT);
      attachInterrupt(0, blink, CHANGE);
    }

    void loop()
    {
      digitalWrite(pin, state);
    }

    void blink()
    {
      state = !state;
    }



  Exemplo 2
    #include <util/atomic.h> // this library includes the ATOMIC_BLOCK macro.
    volatile int input_from_interrupt;

      ATOMIC_BLOCK(ATOMIC_RESTORESTATE) {
         // code with interrupts blocked (consecutive atomic operations will not get interrupted)
         int result = input_from_interrupt;
       }
*/
```



Utilitários
```js
/*
PROGMEM
  Descrição
    Armazene os dados na memória flash (programa) em vez da SRAM. Há uma descrição dos vários tipos de memória disponíveis em uma placa Arduino.

    A palavra-chave PROGMEM é um modificador de variável, ela deve ser usada apenas com os tipos de dados definidos em pgmspace.h. Ele diz ao compilador "colocar essas informações na memória flash", em vez de em SRAM, onde normalmente iria.

    PROGMEM faz parte da biblioteca pgmspace.h . Ele é incluído automaticamente nas versões modernas do IDE, no entanto, se você estiver usando uma versão IDE abaixo de 1.0 (2011), primeiro precisará incluir a biblioteca no topo do seu esboço, desta forma:

    #include <avr/pgmspace.h>

  Sintaxe
    const dataType variableName[] PROGMEM = {data0, data1, data3…​};

      dataType - qualquer tipo de variável
      variableName - o nome da sua matriz de dados

    Note que como o PROGMEM é um modificador de variável, não existe uma regra rígida sobre onde ele deve ir, então o compilador do Arduino aceita todas as definições abaixo, que também são sinônimos. No entanto experimentos indicaram que, em várias versões do Arduino (que tem a ver com a versão do GCC), o PROGMEM pode funcionar em um local e não em outro. O exemplo "string table" abaixo foi testado para funcionar com o Arduino 13. Versões anteriores do IDE podem funcionar melhor se o PROGMEM for incluído após o nome da variável.

      const dataType variableName[] PROGMEM = {}; // use this form
      const PROGMEM dataType variableName[] = {}; // or this one
      const dataType PROGMEM variableName[] = {}; // not this one

    Embora o PROGMEM possa ser usado em uma única variável, só vale a pena se você tiver um bloco maior de dados que precisa ser armazenado, o que geralmente é mais fácil em uma matriz (ou outra estrutura de dados C além da nossa discussão atual) .

    Usando PROGMEM também é um procedimento de duas etapas. Depois de obter os dados na memória Flash, são necessários métodos especiais (funções), também definidos na biblioteca pgmspace.h , para ler os dados da memória do programa de volta ao SRAM, para que possamos fazer algo útil com eles.

  Notas e avisos
    Por favor, note que as variáveis ​​devem ser globalmente definidas, ou definidas com a palavra-chave estática, a fim de trabalhar com o PROGMEM.

    O seguinte código não funcionará quando dentro de uma função:

      const char long_str[] PROGMEM = "Hi, I would like to tell you a bit about myself.\n";

    O código a seguir funcionará, mesmo se definido localmente em uma função:

      const static char long_str[] PROGMEM = "Hi, I would like to tell you a bit about myself.\n"
*/


/*
F()
    Quando uma instrução como:
      Serial.print("Write something on  the Serial Monitor");

    é usado, a cadeia a ser impressa é normalmente salva na RAM. Se o seu esboço imprime muitas coisas no Serial Monitor, você pode facilmente preencher a RAM. Se você tiver espaço livre na memória FLASH, poderá indicar facilmente que a sequência deve ser salva em FLASH usando a sintaxe:

      Serial.print(F("Write something on the Serial Monitor that is stored in FLASH"));

  Exemplo de código
    Os fragmentos de código a seguir ilustram como ler e gravar caracteres não assinados (bytes) e ints (2 bytes) para PROGMEM.


    // save some unsigned ints
    const PROGMEM  uint16_t charSet[]  = { 65000, 32796, 16843, 10, 11234};

    // save some chars
    const char signMessage[] PROGMEM  = {"I AM PREDATOR,  UNSEEN COMBATANT. CREATED BY THE UNITED STATES DEPART"};

    unsigned int displayInt;
    int k;    // counter variable
    char myChar;

    void setup() {
      Serial.begin(9600);
      while (!Serial);  // wait for serial port to connect. Needed for native USB

      // put your setup code here, to run once:
      // read back a 2-byte int
      for (k = 0; k < 5; k++)
      {
        displayInt = pgm_read_word_near(charSet + k);
        Serial.println(displayInt);
      }
      Serial.println();

      // read back a char
      for (k = 0; k < strlen_P(signMessage); k++)
      {
        myChar =  pgm_read_byte_near(signMessage + k);
        Serial.print(myChar);
      }

      Serial.println();
    }

    void loop() {
      // put your main code here, to run repeatedly:

    }
*/


/*
Matrizes de String
    Muitas vezes é conveniente quando se trabalha com grandes quantidades de texto, como um projeto com uma tela LCD, para configurar uma matriz de seqüências de caracteres. Como as próprias strings são arrays, isso é na verdade um exemplo de uma matriz bidimensional.

    Estas tendem a ser grandes estruturas, portanto, colocá-las na memória de programação é geralmente desejável. O código abaixo ilustra a ideia.

    //
      PROGMEM string demo
      How to store a table of strings in program memory (flash),
      and retrieve them.

      Information summarized from:
      http://www.nongnu.org/avr-libc/user-manual/pgmspace.html

      Setting up a table (array) of strings in program memory is slightly complicated, but
      here is a good template to follow.

      Setting up the strings is a two-step process. First define the strings.
    //

     #include <avr/pgmspace.h>
     const char string_0[] PROGMEM = "String 0";   // "String 0" etc are strings to store - change to suit.
     const char string_1[] PROGMEM = "String 1";
     const char string_2[] PROGMEM = "String 2";
     const char string_3[] PROGMEM = "String 3";
     const char string_4[] PROGMEM = "String 4";
     const char string_5[] PROGMEM = "String 5";


     // Then set up a table to refer to your strings.

     const char* const string_table[] PROGMEM = {string_0, string_1, string_2, string_3, string_4, string_5};

     char buffer[30];    // make sure this is large enough for the largest string it must hold

     void setup()
     {
       Serial.begin(9600);
       while(!Serial); // wait for serial port to connect. Needed for native USB
       Serial.println("OK");
     }


     void loop()
     {
       //
       Using the string table in program memory requires the use of special functions to retrieve the data.
          The strcpy_P function copies a string from program space to a string in RAM ("buffer").
          Make sure your receiving string in RAM  is large enough to hold whatever
          you are retrieving from program space.
        //


       for (int i = 0; i < 6; i++)
       {
         strcpy_P(buffer, (char*)pgm_read_word(&(string_table[i]))); // Necessary casts and dereferencing, just copy.
         Serial.println(buffer);
         delay( 500 );
       }
     }
*/


/*
sizeof()
  Descrição
    O operador sizeof retorna o número de bytes em um tipo de variável ou o número de bytes ocupados por uma matriz.

  Sintaxe
    sizeof(variable)

  Parâmetros
    variable : qualquer tipo de variável ou matriz (por exemplo, int, float, byte)

  Retorna
    O número de bytes em uma variável ou bytes ocupados em uma matriz. (size_t)

  Exemplo de código
    O operador sizeof é útil para lidar com matrizes (como cadeias de caracteres) onde é conveniente poder alterar o tamanho da matriz sem quebrar outras partes do programa.

    Este programa imprime uma seqüência de texto um caractere por vez. Tente mudar a frase de texto.

      char myStr[] = "this is a test";
      int i;

      void setup(){
        Serial.begin(9600);
      }

      void loop() {
        for (i = 0; i < sizeof(myStr) - 1; i++){
          Serial.print(i, DEC);
          Serial.print(" = ");
          Serial.write(myStr[i]);
          Serial.println();
        }
        delay(5000); // slow down the program
      }


    Observe que sizeof retorna o número total de bytes. Portanto, para tipos de variáveis ​​maiores, como ints, o loop for seria algo como isto. Note também que uma string formatada corretamente termina com o símbolo NULL, que tem valor ASCII 0.
       
      for (i = 0; i < (sizeof(myInts)/sizeof(int)); i++) {
        // do something with myInts[i]
      }
*/
```