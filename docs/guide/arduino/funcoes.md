# Funcoes

  A segmentação de código em funções permite que um programador crie partes modulares de código que executam uma tarefa definida e, em seguida, retornam à área de código a partir da qual a função foi "chamada". O caso típico para criar uma função é quando é necessário executar a mesma ação várias vezes em um programa.

  Para programadores acostumados a usar o BASIC, as funções no Arduino fornecem (e estendem) a utilidade de usar sub-rotinas (GOSUB em BASIC).

  A padronização de fragmentos de código em funções tem várias vantagens:

      Funções ajudam o programador a se manter organizado. Muitas vezes isso ajuda a conceituar o programa.
      As funções codificam uma ação em um lugar, de modo que a função só precisa ser pensada e depurada uma vez.
      Isso também reduz as chances de erros na modificação, se o código precisar ser alterado.
      As funções tornam o esboço inteiro menor e mais compacto porque as seções de código são reutilizadas muitas vezes.
      Eles facilitam a reutilização de código em outros programas, tornando-o mais modular e, como um bom efeito colateral, o uso de funções também torna o código mais legível.

  Existem duas funções necessárias em um esboço do Arduino, setup () e loop (). Outras funções devem ser criadas fora dos parênteses dessas duas funções. Como exemplo, vamos criar uma função simples para multiplicar dois números.

  Exemplo

    Anexo (Anexo/FuncAnatomy.png)

    Para "chamar" a nossa função de multiplicação simples, passamos os parâmetros do tipo de dados que está esperando:

      void loop(){
        int i = 2;
        int j = 3;
        int k;

        k = myMultiplyFunction(i, j); // k now contains 6
      }

    Nossa função precisa ser declarada fora de qualquer outra função, então "myMultiplyFunction ()" pode ir acima ou abaixo da função "loop ()".

    O esboço inteiro ficaria assim:

      void setup(){
        Serial.begin(9600);
      }

      void loop() {
        int i = 2;
        int j = 3;
        int k;

        k = myMultiplyFunction(i, j); // k now contains 6
        Serial.println(k);
        delay(500);
      }

      int myMultiplyFunction(int x, int y){
        int result;
        result = x * y;
        return result;
      }


    Outro exemplo

    Esta função lerá um sensor cinco vezes com analogRead () e calculará a média de cinco leituras. Em seguida, ele escala os dados para 8 bits (0-255) e os inverte, retornando o resultado invertido.

      int ReadSens_and_Condition(){
        int i;
        int sval = 0;

        for (i = 0; i < 5; i++){
          sval = sval + analogRead(0);    // sensor on analog pin 0
        }

        sval = sval / 5;    // average
        sval = sval / 4;    // scale to 8 bits (0 - 255)
        sval = 255 - sval;  // invert output
        return sval;
      }

    Para chamar nossa função, apenas a designamos para uma variável.

      int sens;

      sens = ReadSens_and_Condition();

    Como você pode ver, mesmo se uma função não tiver parâmetros e nenhum retorno for esperado "(" e ")" colchetes mais ";" Deve ser dada.

    O texto da referência do Arduino está licenciado sob uma licença Creative Commons Attribution-ShareAlike 3.0 . Amostras de código na referência são liberadas para o domínio público.





## I/O Digital
pinMode()        - Configura o pino especificado para se comportar como entrada ou saída
digitalRead()    - Le o valor de um pino digital especifico
digitalWrite()   - Escreva um valor HIGH ou LOW em um pino digital



## I/O Analógica
analogRead()        - Lê o valor do pino analógico especificado
analogReference()   - Configura a tensão de referência usada para entrada analógica
analogWrite()       - Escreve um valor analógico ( onda PWM ) em um pino



## I/O Avançado
tone()              - Gera uma onda quadrada da frequência especificada (e ciclo de trabalho de 50%) em um pino
noTone()            - Para/Stop a geração de uma onda quadrada disparada pelo tone()
pulseIn()           - Lê um pulso ( HIGH ou LOW ) em um pino
pulseInLong()       - É uma alternativa ao pulseIn (), que é melhor em lidar com pulsos longos e interromper cenários afetados.
shiftIn()           - Desloca um byte de dados um bit por vez
shiftOut()          - Desloca um byte de dados um bit por vez


## Tempo
delay()               - Pausa o programa pelo período de tempo (em milissegundos) especificado como parâmetro. (Há 1000 milissegundos em um segundo.)
delayMicroseconds()   - Pausa o programa pelo período de tempo (em microssegundos) especificado como parâmetro
micros()              - Retorna o número de microssegundos desde que a placa do Arduino começou a executar o programa atual
millis()              - Retorna o número de milissegundos desde que a placa do Arduino começou a executar o programa atual.



## Matemática
abs()        - Calcula o valor absoluto de um número.
constrain()  - Restringe um número para estar dentro de um intervalo
map()        - Re-mapeia um número de um intervalo para outro
max()        - Calcula o máximo de dois números
min()        - Calcula o mínimo de dois números.
pow()        - Calcula o valor de um número elevado a uma potência
sq()         - Calcula o quadrado de um número: o número multiplicado por si mesmo.
sqrt()       - Calcula a raiz quadrada de um número.



## Trigonometria
cos()       - Calcula o cosseno de um ângulo (em radianos)
sin()       - Calcula o seno de um ângulo (em radianos)
tan()       - Calcula a tangente de um ângulo (em radianos).


## Caracteres
isAlpha()             - Analise se um caractere é alfa (isso é uma letra)
isAlphaNumeric()      - Analise se um caractere é alfanumérico (ou seja, uma letra ou um número)
isAscii()             - Analise se um char é Ascii
isControl()           - Analise se um char é um caractere de controle.
isDigit()             - Analise se um caractere é um dígito (isto é, um número)
isGraph()             - Analise se um caractere é imprimível com algum conteúdo (o espaço é imprimível, mas não tem conteúdo).
isHexadecimalDigit()  - Analise se um caractere é um dígito hexadecimal (AF, 0-9)
isLowerCase()         - Analise se um caractere é minúsculo (ou seja, uma letra minúscula)
isPrintable()         - Analise se um caractere é imprimível (ou seja, qualquer caractere que produza uma saída, até mesmo um espaço em branco)
isPunct()             - Analise se um caracter é pontuação (ou seja, uma vírgula, um ponto e vírgula, uma marca de exlamação e assim por diante)
isSpace()             - Analise se um char é o caractere de espaço.
isUpperCase()         - Analise se um caractere é maiúsculo (isso é uma letra maiúscula)
isWhitespace()        - Analise se um char é um espaço em branco, ou seja, espaço, formfeed ('\ f'), newline ('\ n'), retorno de carro ('\ r'), guia horizontal ('\ t') e guia vertical ('\ v'))



## Números Aleatórios
random()       - A função aleatória gera números pseudo-aleatórios.
randomSeed()   - Inicializa o gerador de números pseudo-aleatórios, fazendo com que ele inicie em um ponto arbitrário em sua sequência aleatória



## Bits e Bytes
bit()         - Calcula o valor do bit especificado (bit 0 é 1, bit 1 é 2, bit 2 é 4, etc.)
bitClear()    - Limpa (escreve um 0 pata) um pouco de uma variável numérica
bitRead()     - Lê um pouco de um número
bitSet()      - Define (escreve um 1 a) um bit de uma variável numérica
bitWrite()    - Escreve um pouco de uma variável numérica
highByte()    - Extrai o byte de alta ordem (mais à esquerda) de uma palavra (ou o segundo byte mais baixo de um tipo de dados maior)
lowByte()     - Extrai o byte de menor ordem (mais à direita) de uma variável (por exemplo, uma palavra)


## Interrupções externas
attachInterrupt()   - Pinos Digitais Com Interrupções
detachInterrupt()   - Desativa a interrupção dada.


## Interrupções
interrupts()       - Reabilita interrupções (depois de terem sido desativadas por nointerrupts()
noInterrupts()     - Desativa as interrupções (você pode reativá-las com interrupts())


## Comunicação
    Serial                 - Usado para comunicação entre a placa Arduino e um computador ou outros dispositivos.
        If (Serial)            - Indica se a porta serial especificada está pronta.
        available()            - Obtenha o número de bytes (caracteres) disponíveis para leitura na porta serial.
        availableForWrite()    - Obtenha o número de bytes (caracteres) disponíveis para gravação no buffer serial sem bloquear a operação de gravação.
        begin()                - Define a taxa de dados em bits por segundo (baud) para transmissão de dados serial
        end()                  - esativa a comunicação serial, permitindo que os pinos RX e TX sejam usados ​​para entrada e saída gerais.
        find()                 - lê os dados do buffer serial até que a string de destino de determinado tamanho seja encontrada
        findUntil()            - lê os dados do buffer serial até que uma string de destino de determinado comprimento ou string de terminador seja encontrada.
        flush()                - Aguarda pela transmissão de dados seriais de saída para concluir
        parseFloat()           - retorna o primeiro número de ponto flutuante válido do buffer Serial.
        parseInt()             - Procura o próximo número inteiro válido no stream.parseInt() serial recebido. O stream.
        peek()                 - Retorna o próximo byte (caractere) dos dados seriais recebidos sem removê-lo do buffer serial interno.
        print()                - Imprime dados na porta serial como texto ASCII legível por humanos.
        println()              - Imprime dados na porta serial como texto ASCII legível por humanos seguido por um caractere de retorno de carro (ASCII 13 ou '\ r') e um caractere de nova linha (ASCII 10 ou '\ n').
        read()                 - Lê dados seriais recebidos. read () herda da classe do utilitário Stream
        readBytes()            - lê caracteres da porta serial em um buffer
        readBytesUntil()       - lê caracteres do buffer serial em uma matriz
        readString()           - lê caracteres do buffer serial em uma seqüência de caracteres
        readStringUntil()      - lê caracteres do buffer serial em uma string
        setTimeout()           - define o máximo de milissegundos para aguardar dados seriais ao usar serial.readBytesUntil () ou serial.readBytes()
        write()                - Grava dados binários na porta serial. Esses dados são enviados como um byte ou série de bytes; para enviar os caracteres que representam os dígitos de um número, use a função print().
        serialEvent()          - Chamado quando os dados estão disponíveis

    stream                     - classe base para fluxos baseados em caracteres e binários.
        Serial (Topico anterior) -
        Wire                   -
        Ethernet               - Permitem que uma placa Arduino se conecte à internet.
            Ethernet class       - Inicializa a biblioteca de ethernet e as configurações de rede.
            begin()
            localIP()
            maintain()
        IPAddress class      - Funciona com o endereçamento IP local e remoto.
            IPAddress()
        Server class         - Cria servidores que podem enviar dados para e receber dados de clientes conectados (programas em execução em outros computadores ou dispositivos).
            EthernetServer()
            begin()
            available()
            write()
            print()
            println()
        Client class         - Cria clientes que podem se conectar a servidores e enviar e receber dados.
            EthernetClient()
            if (EthernetClient)
            connected()
            connect()
            write()
            print()
            println()
            available()
            read()
            flush()
            stop()
        EthernetUDP class    - Permite que a mensagem UDP seja enviada e recebida.
            begin()
            read()
            write()
            beginPacket()
            endPacket()
            parsePacket()
            available()
            stop()
            remoteIP()
            remotePort()
        SD
            SD class             - Fornece funções para acessar o cartão SD e manipular seus arquivos e diretórios.
                begin()
                exists()
                mkdir()
                open()
                remove()
                rmdir()
            File class           - Permite ler e gravar arquivos individuais no cartão SD.
                name()
                available()
                close()
                flush()
                peek()
                position()
                print()
                println()
                seek()
                size()
                read()
                write()
                isDirectory()
                openNextFile()
                rewindDirectory()



## USB
Keyboard - As funções do teclado permitem que as placas 32U4 ou SAMD de micro-base enviem as teclas digitadas para um computador conectado através da porta USB nativa de seu micro.

- Keyboard.begin()
- Keyboard.end()
- Keyboard.press()
- Keyboard.print()
- Keyboard.println()
- Keyboard.release()
- Keyboard.releaseAll()
- Keyboard.write()

Mouse - As funções do mouse permitem que as placas micro de 32u4 ou SAMD controlem o movimento do cursor em um computador conectado através da porta USB nativa de seu micro.

- Mouse.begin()
- Mouse.click()
- Mouse.end()
- Mouse.move()
- Mouse.press()
- Mouse.release()
- Mouse.isPressed()
