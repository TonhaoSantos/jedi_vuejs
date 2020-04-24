# Projetos
> Licoes feitas em tutoriais da internet e livros para uso pessoal futuros
>
> Não possuo direito em muitos codigos e nem quero, caso ache que o codigo é seu pode me contatar para que eu coloque o seu direito nele :D

## LCD 16x2
> Alguns LCD's podem nao vir com um resistor no pino 15(A/Led 1), podemos usar dois resistores de **165 Ohms** sem serie
>
> O pino 3 é usado para regular a claridade do display, se nao tiver um potenciometro ou nao quiser regular o brilho e quiser o maximo é só ligar ele no terra (Lemnrando que o mais claro da para ver um fundo nas letras)
>
> Do pino 4 em diante sao os pinos de controle, por meio deles podemos informar para o arduino oq queremos que ele faca, se queremos que ele apague tudo que esta nele, pisque, ...

![LCD 16X2](/lcd_16_2.png)

Ligacoes
| Pino LCD  |  Funcao  |  Ligacao  |
|-----------|----------|-----------|
| 1         |  VSS     |  GND      |
| 2         |  VDD     |  VCC 5V   |
| 3         |  V0      |  Pino central potenciometro (vai de 0v até 5v)    |
| 4         |  RS      |  Pino 12 Arduino         |
| 5         |  RW      |  GND         |
| 6         |  E       |  Pino 11 Arduino         |
| 7         |  D0      |  Nao conectado         |
| 8         |  D1      |  Nao conectado         |
| 9         |  D2      |  Nao conectado         |
| 10        |  D3      |  Nao conectado         |
| 11        |  D4      |  Pino 5 Arduino         |
| 12        |  D5      |  Pino 4 Arduino         |
| 13        |  D6      |  Pino 3 Arduino         |
| 14        |  D7      |  Pino 2 Arduino         |
| 15        |  A (led 1) |  VCC 5V   |
| 16        |  K (led 2) |  GND      |

[PDF Tabelas de carascteres](/tabela_caracter_lcd.pdf), se atentar que existem duas tabelas. Cada display usa uma.

Codigo 1
```js
//Carrega a biblioteca LiquidCrystal
#include <LiquidCrystal.h>
 
//Define os pinos que serão utilizados para ligação ao display
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
 
void setup()
{
  // Define o número de colunas e linhas do LCD
  /*
    Em alguns displays (especiais) o tamanho do caracter
      é um pouco maior falando em pontos
    
    Nos mais comuns temos cada caracter formados por 5x8:
      - 5 pontos na horizontal
      - 8 pontos na vertical
    
    Em alguns outros temos 5x10

    Por isso temos que passar como terceiro parametro no begin o tamanho do nosso.

    Por padrao vem LCD_5X8DOTS
  */
  lcd.begin(16, 2, LCD_5X10DOTS);
}
 
void loop()
{
  //Limpa a tela
  lcd.clear();
  //Posiciona o cursor na coluna 3, linha 0;
  lcd.setCursor(3, 0);
  //Envia o texto entre aspas para o LCD
  lcd.print("Linha 1");
  lcd.setCursor(3, 1);
  lcd.print("Linha 2");
  delay(5000);

  // Para imprimir um unico caracter, envolvido de aspas simples
  // lcd.write('a');
   
  //Rolagem para a esquerda
  for (int posicao = 0; posicao < 3; posicao++)
  {
    lcd.scrollDisplayLeft();
    delay(300);
  }
   
  //Rolagem para a direita
  for (int posicao = 0; posicao < 6; posicao++)
  {
    lcd.scrollDisplayRight();
    delay(300);
  }

  // Limapr a tela
  // lcd.clear();
}
```

Codigo 2
```js
#include <LiquidCrystal.h>

LiquidCrystal displayTeste(2,4,10,11,12,13);

int efeito = 0;
int contraste = 0;
boolean aumenta = true;


byte smiley[8] = {
  B00000,
  B10001,
  B00000,
  B00000,
  B10001,
  B01110,
  B00000,
};

void setup() {
  // Pino para dar o efeito igual tivesse usando um potenciomentro
  pinMode(5, OUTPUT);
  analogWrite(5, 0);

  /*
    Se queremos usar caracteres ou qualquer outra informacao usando as tabelas,
      para displays AO1 (no pdf de download) é mais complicado por nao ter acentucao.
    O display A01 possui todas a 16 primeiras possicoes (0 - 15) espacos reservados
      para criarmos os nossos caracteres.
    Para isso podemos usar o createChar passando no primeiro parametro a possicao
      na tabela e como segundo argumento um array do tipo byte com 8 possicoes.
    Cada possicao vamos escrever um byte no formato do caracter que queremos, com
      a estrutura B00000.
    Onde esta o zero podemos setar 0 ou 1, sendo 0 onde nao aparece nada e 1 onde
      aparece um ponto naquele caracter.
    Comeca com B pois estamos informando o formato binario.
    E possui 5 colunas de um caracter, que ja falei anteriormente junto com o LCD_5X10DOTS
      neste exemplo é um display LCD_5X8DOTS.
    Esta criacao de caracter tem q ser antes do begin do display, para poder usar.
  */
  displayTeste.createChar(0, smiley);

  displayTeste.begin(16,2);

  // Ligar o cursor
  //displayTeste.cursor();

  // Ligar o cursor tbm, com o cursor piscando
  //displayTeste.blink();

  // Voltar o cursor para o inicio, no setCursor(0,0);
  // displayTeste.home();

  displayTeste.print("Brincando com");
  displayTeste.setCursor(2,1);
  displayTeste.print("Ideias ");
  displayTeste.write(byte(0));
  
  //Teste da Tabela de Caracteres
  displayTeste.setCursor(15,1);

  // Usando a tabela em pdf de download
  displayTeste.write(byte(244));

}

void loop() {
  // put your main code here, to run repeatedly:

  if (efeito == 1) {
     analogWrite(5, contraste);
     delay(20);

     if (aumenta) contraste++;
     else         contraste--;
  
     if (contraste == 150) aumenta = false;

     if (contraste == 0) aumenta = true;
  }

  if (efeito == 2) {
     // Ocultar o conteudo para visualizacao
     displayTeste.noDisplay();
     delay(500);

     // Voltar o conteudo para visualizacao
     displayTeste.display();
     delay(500);
  }

  if (efeito == 3) {
     // Permite o texto rolar para a esquerda, quando acabar volta
     displayTeste.scrollDisplayLeft();
     delay(350);
  }

  if (efeito == 4) {
     // Permite o texto rolar para a direita, quando acabar volta
     displayTeste.scrollDisplayRight();
     delay(350);
  }
  
}
```

Codigo 3
```js
#include <LiquidCrystal.h>

LiquidCrystal displayTeste(2,4,10,11,12,13);

void setup() {
  pinMode(5, OUTPUT);
  analogWrite(5, 0);

  displayTeste.begin(16,2);
  displayTeste.blink();
}

void loop() {

  displayTeste.clear();
  displayTeste.home();

  //displayTeste.setCursor(15,0);
  // Movimento o cursor da direita para a esquerda
  //displayTeste.rightToLeft();


  //displayTeste.setCursor(0,0);
  // Movimento o cursor da esquerda para a direita (padrao)
  //displayTeste.leftToRight();
  
  // o cursor fica fixo e somente o conteudo tem scroll
  //displayTeste.autoscroll();
  //displayTeste.setCursor(8,0);
  
  // Escreve do 0 ao 9 sequencialmente
  for (int c = 0; c < 10; c++) {
      displayTeste.write(byte(48 + c));
      delay(1000);
  }
}
```




## Barra Grafica de Led
> Caso nao tenha um bargraph, este tutorial mostra como montar um com leds. O sistema é o mesmo.

![Barra Grafica](/Bargraph.png)

Codigo
```js
//Carrega a biblioteca LiquidCrystal
#include <LiquidCrystal.h>
 
//Define os pinos que serão utilizados para ligação ao display
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
 
void setup()
{
  //Define o número de colunas e linhas do LCD
  lcd.begin(16, 2);
}
 
void loop()
{
  //Limpa a tela
  lcd.clear();
  //Posiciona o cursor na coluna 3, linha 0;
  lcd.setCursor(3, 0);
  //Envia o texto entre aspas para o LCD
  lcd.print("Linha 1");
  lcd.setCursor(3, 1);
  lcd.print("Linha 2");
  delay(5000);
   
  //Rolagem para a esquerda
  for (int posicao = 0; posicao < 3; posicao++)
  {
    lcd.scrollDisplayLeft();
    delay(300);
  }
   
  //Rolagem para a direita
  for (int posicao = 0; posicao < 6; posicao++)
  {
    lcd.scrollDisplayRight();
    delay(300);
  }
}
```



## Led RGB
> As portas no arduino tem que ser as com o ~ (PWM)
>
> Se a perna comum for catodo é só ligar no GND e caso seja anodo deve ser ligdo no 5v sem resistor
>
> Se for anodo comum onde é 0 fica 255 e onde é 255 fica 0

![Led RGB](/led_rgb.png)

- Tensão de operação (vermelho): 2 a 2,5VDC
- Tensão de operação (verde): 3,2 a 3,6VDC
- Tensão de operação (azul): 3,2 a 3,6VDC
- Corrente de operação (em cada LED): 20mA

Como resistor para cada uma das 3 pernas nao comuns podemos ter de 220 Ohms.

O valor do analogWrite vai de 0 até 255, 0 é mais claro (invisivel) e 255 é mais escuro.

Codigo uma cor unica
```js
int pinoR = 11;
int pinoG = 10;
int pinoB = 9;
  
void setup()
{
  pinMode(pinoR, OUTPUT);
  pinMode(pinoG, OUTPUT);
  pinMode(pinoB, OUTPUT);
}

void loop()
{
  analogWrite(pinoR, 255);
  delay(1000);
  analogWrite(pinoR, 0);
  delay(1000);
}
```


Codigo blink
```js
int pinoR = 11;
int pinoG = 10;
int pinoB = 9;
  
void setup()
{
  pinMode(pinoR, OUTPUT);
  pinMode(pinoG, OUTPUT);
  pinMode(pinoB, OUTPUT);
}

void loop()
{
  analogWrite(pinoR, 255);
  delay(1000);
  analogWrite(pinoR, 0);
  analogWrite(pinoG, 255);
  delay(1000);
  analogWrite(pinoG, 0);
  analogWrite(pinoB, 255);
  delay(1000);
  analogWrite(pinoB, 0);
}
```


Codigo anodo comum
```js
boolean anodo_comum = false;
int pinoR = 11;
int pinoG = 10;
int pinoB = 9;
  
void setup()
{
  pinMode(pinoR, OUTPUT);
  pinMode(pinoG, OUTPUT);
  pinMode(pinoB, OUTPUT);
}

void loop()
{
  setCor(255, 0, 0);
  delay(1000);
  setCor(0, 255, 0);
  delay(1000);
  setCor(0, 0, 255);
  delay(1000);
}

void setCor(int vermelho, int verde, int azul) {
    if (anodo_comum == true) {
        vermelho = 255 - 0;
        verde = 255 - 0;
        azul = 255 - 0;
    }

    analogWrite(pinoR, vermelho);
    analogWrite(pinoG, verde);
    analogWrite(pinoB, azul);
}
```



## Chave Táctil ou Push Button
> Conduz somente quando está pressionado

![Push Button](/push_button.png)

- Tensão máxima: 12VDC
- Corrente máxima: 50mA

Uma coisa importante para se lembrar é usar um resistor na entrada ligado no terra para evitar a alta impedancia/flutuacao na porta logica pois o circuito podendo ser ativado tbm pela imterferencia do ambiente consideranco o que ele quiser, tanto zero como um e ficar nesta troca constante.

Este resistor que quando vai para o terra é chamado do resistor de PULL-DOWN, que é quando vamos enviar 5v para dizer que foi precionado. É um resistor comum, nada especial.

Este resistor que quando vai para o 5v é chamado do resistor de PULL-UP, que é quando vamos enviar 0v para dizer que foi precionado. É um resistor comum, nada especial.

Não tem um valor ideal para o resistor, mas podemos usar um resistor sempre abaixo de 1k Ohm (830 ohm, 510 ohm, ...). Tambem podemos usar um de 10k que tbm vai funcionar.

Pull-Down (Vara evitar que a porta ache que esta ligada sendo que nao esta)
![Pull-Down](/pulldown.png)

```js
int led = 13;
int btPullDown = 10;

void setup()
{
  pinMode(led, OUTPUT);
  pinMode(btPullDown, INPUT);
  
  digitalWrite(led, LOW);
}

void loop()
{
  if(digitalRead(btPullDown) == HIGH){
     // Acende led
     digitalWrite(led, HIGH);
  } else {
    // Apaga led
    digitalWrite(led, LOW);
  }
}
```

Pull-Up (Vara evitar que a porta ache que nao esta ligada sendo que esta.

No arduino internamente já existe este resistor, para usar basta definir o pinMode(pino, INPUT_PULLUP).
![Pull-Up](/pullup.png)

```js
int led = 13;
int btPullUp = 10;

void setup()
{
  pinMode(led, OUTPUT);
  pinMode(btPullDown, btPullUp);
  
  digitalWrite(led, LOW);
}

void loop()
{
  if(digitalRead(btPullDown) == LOW){
     // Acende led
     digitalWrite(led, HIGH);
  } else {
    // Apaga led
    digitalWrite(led, LOW);
  }
}
```

Exemplos

Aperta para ligar e solta para desligar
```js
int pinoBotao = 7;
int pinoLed = 2;

void setup() {
  	// Define o pino como entrada _PULLUP
    // Serve para ativar o resistor interno do arduino garantindo que nao tenha
    // flutuacao entre 0 (LOW) e 1 (HIGH)
  	pinMode(pinoBotao, INPUT_PULLUP);

  	// Pino de saida
	pinMode(pinoLed, OUTPUT);
  
  	// Led inicia desligado
	digitalWrite(pinoLed, LOW);
}
void loop(){
  // Verifica se o o botao é LOW
  if(digitalRead(pinoBotao) == LOW){
     // Acende led
     digitalWrite(pinoLed, HIGH);

     // Colocando um delay ao desligar
     delay(2000);
  } else {
    // Apaga led
    digitalWrite(pinoLed, LOW);
  }
}
```

Ligado intermitente

```js
int pinoBotao = 7;
int pinoLed = 2;
boolean ligado = false;

void setup() {
  	// Define o pino como entrada _PULLUP
    // Serve para ativar o resistor interno do arduino garantindo que nao tenha
    // flutuacao entre 0 (LOW) e 1 (HIGH)
  	pinMode(pinoBotao, INPUT_PULLUP);

  	// Pino de saida
	pinMode(pinoLed, OUTPUT);
  
  	// Led inicia desligado
	digitalWrite(pinoLed, LOW);
}
void loop(){
  // Verifica se o o botao é LOW
  if(digitalRead(pinoBotao) == LOW){
    // Evitando ficar lendo a porta do botao apos ser precionado
    delay(500);

    switch(ligado) {
        case false:
            // Apagando led
            digitalWrite(pinoLed, HIGH);
            ligado = true;
            break;
        case true:
            // Acende led
            digitalWrite(pinoLed, LOW);
            ligado = false;

            // Colocando um delay ao desligar
            delay(2000);

            break;
    }
  }
}
```

Outra forma de ligar o botao é direto no 5v e a outra ponta em alguma porta, mas antes da saida para esta outra porta tem que ter um resistor de 10K e onde uma ponta vai estar na saida do botao e a outra no GND.

Este resistor com o GND serve para fechar um curto mas evitando queimar a placa já que pode passar uma tensao grande direto.

![Push Button 2](/push_button2.png)

Exemplo
```js
int pinoBotao = 7;
int pinoLed = 2;
int click = 0;

void setup() {
  	pinMode(pinoBotao, INPUT);
	pinMode(pinoLed, OUTPUT);
}
void loop(){
  click = digitalRead(pinoBotao);

  if(click == HIGH){
    digitalWrite(pinoLed, HIGH);
    delay(1000);
  } else {
    digitalWrite(pinoLed, LOW);
  }
}
```



## Buzzer
![Buzzer](/Buzzer.png)

- Tensão de operação: 3,5 - 5V

Exemplos basico
```js
int pinoBuzzer = 8;

void setup() {
  	pinMode(pinoBuzzer, OUTPUT);
}
void loop(){
  digitalWrite(pinoBuzzer, HIGH);
  delay(150);
  digitalWrite(pinoBuzzer, LOW);
  delay(2000);
}
```

Exemplos com Tom
```js
int pinoBuzzer = 8;

void setup() {
  	pinMode(pinoBuzzer, OUTPUT);
}
void loop(){
  // Emitir tom
  tone(pinoBuzzer, 2500, 100);

  delay(1000);

  // Parar tom
  noTone(pinoBuzzer);
}
```

```js
int pinoBuzzer = 8;

void setup() {
  	pinMode(pinoBuzzer, OUTPUT);
}
void loop(){
  tone(pinoBuzzer, 1500);
  delay(200);
  tone(pinoBuzzer, 2000);
  delay(200);
}
```

Exemplo da musica do [star wars](https://create.arduino.cc/projecthub/HiHiHiHiiHiiIiH/star-wars-on-a-buzzer-0814f2)



## Potenciomentro
> Tem seus numeros de 0 até 1023 (Ou seja, tem 1024 possicoes)
>
> Nada mais é do que um resistor com a resistencia variavel

![Potenciomentro](/Potenciomentro.png)

Exemplo basico
```js
void setup()
{
  Serial.begin(9600);
}
 
void loop()
{
  Serial.println(analogRead(A0));
  delay(200);
}
```

Exemplo basico 2
> Imprimindo apenas quando alterar o numero e validando a variacao para mais ou menos que sempre tem com ele parado/girando

```js
int leitura1 = 0;
int leitura2 = 0;

void setup()
{
  Serial.begin(9600);
}
 
void loop()
{
  leitura1 = analogRead(A0);
  
  // O +2 da (leitura2 + 2) é para pegar a variacao pra mais ou menos que existe até com ele parado
  if (leitura1 > (leitura2 + 2) || leitura1 < (leitura2 - 2)) {
    // Salvando o proximo ciclo do loop se nao nunca roda
    leitura2 = leitura1;

    Serial.println(leitura1);
    delay(100);
  }
}
```

Exemplo alterando a claridade do led
> O Led precisa estar em uma porta PWM

![Potenciomentro](/Potenciomentro2.png)

```js
int led = 3;
int valor_potencimetro = 0;
int brilho = 0;

void setup()
{
  pinMode(led, OUTPUT);
}
 
void loop()
{
  valor_potencimetro = analogRead(A0);
  
  // Map serve basicamente para fazer uma regra de tres em dois valores
  /*
  	Recebe
    - Um valor
    - um valor de
    - um valor para
    - um valor equivalente de
    - um valor equivalente para
  */
  brilho = map(valor_potencimetro, 0, 1023, 0, 255);
  analogWrite(led, brilho);
}
```


## Display 7 Segmentos
> De cada lado possui 5 pinos, o que fica no meio é o positivo/negativo (olhar na descricao quando comprar qual é a configuracao dele)
>
> Pode se usar um resistor de 220 Ohms em cada segmento

![Display 7 Segmentos](/7segmentos1.png)
![Display 7 Segmentos](/7segmentos2.png)

Com o ponto

![Display 7 Segmentos](/7segmentos3.png)

- Tensão de operação: 5VDC
- Corrente de operação: 30mA
- Potência dissipada: 60mW
- Configuração: anodo comum

Exemplo basico
```js
int segA = 2;
int segB = 3;
int segC = 4;
int segD = 5;
int segE = 6;
int segF = 7;
int segG = 8;
int segDot = 9;

void setup()
{
  pinMode(segA, OUTPUT);
  pinMode(segB, OUTPUT);
  pinMode(segC, OUTPUT);
  pinMode(segD, OUTPUT);
  pinMode(segE, OUTPUT);
  pinMode(segF, OUTPUT);
  pinMode(segG, OUTPUT);
  pinMode(segDot, OUTPUT);
}
 
void loop()
{
  digitalWrite(segA, LOW);
  digitalWrite(segB, LOW);
  digitalWrite(segC, LOW);
  digitalWrite(segD, HIGH);
  digitalWrite(segE, HIGH);
  digitalWrite(segF, HIGH);
  digitalWrite(segG, HIGH);
  digitalWrite(segDot, 0);
}
```

Exemplo contador de 0 - 9
```js
int a = 2, b = 3, c = 4, d = 5, e = 6, f = 7, g = 8;

// Recebe a quantidade de linhas e colunas que a matriz vai ter
// 10 linhas pq podemos fazer de 0 - 9
// 7 pq temos 7 variaveis/segmentos para ligar
int num[10][7]{
  {a,b,c,d,e,f}, // numero 0
  {b,c}, // numero 1
  {a,b,d,e,g}, // numero 2
  {a,b,c,d,g}, // numero 3
  {b,c,f,g}, // numero 4
  {a,c,d,f,g}, // numero 5
  {a,c,d,e,f,g}, // numero 6
  {a,b,c}, // numero 7
  {a,b,c,d,e,f,g}, // numero 8
  {a,b,c,f,g} // numero 9
};

void setup()
{
  pinMode(a, OUTPUT);
  pinMode(b, OUTPUT);
  pinMode(c, OUTPUT);
  pinMode(d, OUTPUT);
  pinMode(e, OUTPUT);
  pinMode(f, OUTPUT);
  pinMode(g, OUTPUT);
}
 
void loop()
{
  for (int i = 0; i < 10; i++) {
    apaga();
    numero(i);
    delay(1000);
  }
}

// Apagar todos os segmentos do display
void apaga() {
  digitalWrite(a, HIGH);
  digitalWrite(b, HIGH);
  digitalWrite(c, HIGH);
  digitalWrite(d, HIGH);
  digitalWrite(e, HIGH);
  digitalWrite(f, HIGH);
  digitalWrite(g, HIGH); 
}

// Formar um numero
void numero(int n) {
  for (int i = 0; i < 7; i++) {
  	digitalWrite(num[n][i], LOW);
  }
}
```

Exemplo contador de 0 - 9
> Retirado de [blogmasterwalkershop.com.br](https://blogmasterwalkershop.com.br/arduino/arduino-utilizando-o-display-de-7-segmentos-um-digito/)
>
> Todos os direitos reservado ao do DONO blogmasterwalkershop.com.br

```js
byte seven_seg_digits[16][7] = { 
 { 0,0,0,0,0,0,1 },  //DIGITO 0
 { 1,0,0,1,1,1,1 },  //DIGITO 1
 { 0,0,1,0,0,1,0 },  //DIGITO 2
 { 0,0,0,0,1,1,0 },  //DIGITO 3
 { 1,0,0,1,1,0,0 },  //DIGITO 4
 { 0,1,0,0,1,0,0 },  //DIGITO 5
 { 0,1,0,0,0,0,0 },  //DIGITO 6
 { 0,0,0,1,1,1,1 },  //DIGITO 7
 { 0,0,0,0,0,0,0 },  //DIGITO 8
 { 0,0,0,1,1,0,0 },  //DIGITO 9
 { 0,0,0,1,0,0,0 },  //DIGITO A
 { 1,1,0,0,0,0,0 },  //DIGITO B
 { 0,1,1,0,0,0,1 },  //DIGITO C
 { 1,0,0,0,0,1,0 },  //DIGITO D
 { 0,1,1,0,0,0,0 },  //DIGITO E
 { 0,1,1,1,0,0,0 }   //DIGITO F
};
void setup(){
  pinMode(2, OUTPUT); //PINO 2 -> SEGMENTO A  
  pinMode(3, OUTPUT); //PINO 3 -> SEGMENTO B
  pinMode(4, OUTPUT); //PINO 4 -> SEGMENTO C
  pinMode(5, OUTPUT); //PINO 5 -> SEGMENTO D
  pinMode(6, OUTPUT); //PINO 6 -> SEGMENTO E
  pinMode(7, OUTPUT); //PINO 7 -> SEGMENTO F
  pinMode(8, OUTPUT); //PINO 8 -> SEGMENTO G
  pinMode(9, OUTPUT); //PINO 9 -> SEGMENTO PONTO
  ligaPonto(0);
}
void ligaPonto(byte dot){  //FUNÇÃO QUE ACIONA O PONTO DO DISPLAY
  digitalWrite(9, dot);
}
void ligaSegmentosDisplay(byte digit){ //FUNÇÃO QUE ACIONA O DISPLAY
  byte pino = 2;

  for (byte contadorSegmentos = 0; contadorSegmentos < 7; ++contadorSegmentos){ //PARA "contadorSegmentos"
    //IGUAL A 0, ENQUANTO "contadorSegmentos" MENOR QUE 7, INCREMENTA "contadorSegmentos"
    digitalWrite(pino, seven_seg_digits[digit][contadorSegmentos]); //PERCORRE O ARRAY E LIGA OS
    //SEGMENTOS CORRESPONDENTES AO DIGITO
    ++pino; //INCREMENTA "pino"
  }
    ligaPonto(1); //LIGA O PONTO DO DISPLAY
    delay(100); //INTERVALO DE 100 MILISSEGUNDOS
    ligaPonto(0); //DESLIGA O PONTO DO DISPLAY
}
//MÉTODO RESPONSÁVEL PELA CONTAGEM DE 0 A 9 E CONTAGEM DE "A" ATÉ "F" (NA CONTAGEM HEXADECIMAL "A"=10
// "B"=11 / "C"=12 / "D"=13 / "E"=14 / "F"=15)
void loop() {
  for (byte contador = 0; contador < 16; contador++){ //PARA "contador"
    //IGUAL A 0, ENQUANTO "contador" MENOR QUE 16, INCREMENTA "contador"
     delay(500); //INTERVALO DE 500 MILISSEGUNDOS
     ligaSegmentosDisplay(contador); //FAZ A CONTAGEM
  }
  delay(2000); //INTERVALO DE 2 SEGUNDOS
}
```


## Luminosidade
> Nao é polarizado

- Luminosidade: LDR (ligado com um resistor de 1k)
- Tensão de operação (máxima): 150VDC
- Potência máxima: 100mW

![Luminosidade](/luminosidade.png)

```js
int valor = 0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  valor = analogRead(A0);
  Serial.println(valor);
  delay(500);
}
```


## Temperatura
> Nao é polarizado
>
> Onde montei o desenho nao tinha o NTC ai coloquei um capacitor apenas para ilustrar e parecer mais ou MENOSSS igual

- Temperatura: NTC 10K (ligado com um resistor de 10k)

![Temperatura](/temperatura.png)

- Tensão de operação: 3,3 ou 5VDC
- Faixa de medição: -55°C a 125° celsius
- Precisão: ±1%

Download da [biblioteca](/Thermistor.zip).

Para instalar a biblioteca, Sketch > Incluir Biblioteca > Adicionar .zip


```js
#include <Thermistor.h>

Thermistor temp(A0);

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  int temperatura = temp.getTemp();
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" C");
  delay(1000);
}
```


## Interrupcao
> Interrompe o que esta fazendo para fazer outra coisa e depois que terminar volta de onde parou
>
> Somente as portas 2 (interrupcao 0) e 3 (interrupcao 1) no Arduino Uno podem acionar a interrupcao
>
> Se em algum modulo tiver a sigla IRT é pq tem um acionador de interrupcao

![Interrupcao](/interrupcao.png)

A funcao que efetua a interrupcao é a ```attachInterrupt(numero interrupcao, funcao, forma)```.

O numero interrupcao é 0 ou 1 que representam as portas. Podemos passar a porta dentro de uma funcao que faz a traducao.

A funcao que faz a traducao é a ```digitalPinToInterrupt(porta)```, ela retorna 0 para a porta 2 e 1 para a porta 3.

Ele possibilita 4 formas de interrupcao:
- RISING: Executa a interrupcao quando porta for do estado LOW para HIGH
- FALLING: Executa a interrupcao quando porta for do estado HIGH para LOW
- LOW: Executa a interrupcao enquanto a porta estiver no estado LOW
- CHANGE: Executa a interrupcao quando a porta tiver uma mundaca de estado de LOW para HIGH e de HIGH para LOW


```js
#define pinVerde    12
#define pinAmarelo  11
#define pinVermelho 10
#define pinBotao    2

void botaoAcionado();

void setup() {
  pinMode(pinVerde, OUTPUT);
  pinMode(pinAmarelo, OUTPUT);
  pinMode(pinVermelho, OUTPUT);
  
  pinMode(pinBotao, INPUT_PULLUP);
  
  attachInterrupt(digitalPinToInterrupt(pinBotao), botaoAcionado, RISING);
}

void loop() {
  digitalWrite(pinVerde, HIGH);
  digitalWrite(pinAmarelo, LOW);
  delay(1000);

  digitalWrite(pinVerde, LOW);
  digitalWrite(pinAmarelo, HIGH);
  delay(1000);

  // Para desligar a permissao de interrupcao e depois de algumas acoes do codigo permitir
  noInterrupts();

  // Outros codigos qualquer

  // Para ligar a permissao de interrupcao novamente
  interrupts();

  // Para fazer uma interrupcao nao funcionar depois de certo ponto no codigo
  detachInterrupt(numero interrupcao)

}

void botaoAcionado() {
   static bool estado = LOW;
   static unsigned long delayEstado;


   if ( (millis() - delayEstado) > 100 ) {
     estado = !estado;
     delayEstado = millis();
   }
   
   digitalWrite(pinVermelho, estado);
}
```


## Multitarefa
> Permite rodar varias tarefas ao mesmo tempo
> 
> Ao fazer multitarefa nao usar o delay() no loop() e em nenhuma outra funcao pois ele trava o arduino e nao permite fazer mais nada

![Multitarefa](/multitarefa.png)

```js
#define pinLed1 12
#define pinLed2 11
#define pinLed3 10

#define pinBotao1 2
#define pinBotao2 3

void controlaLed1();
void controlaLed2();
void controlaLed3();

void setup() {
  pinMode(pinLed1, OUTPUT);
  pinMode(pinLed2, OUTPUT);
  pinMode(pinLed3, OUTPUT);

  pinMode(pinBotao1, INPUT_PULLUP);
  pinMode(pinBotao2, INPUT_PULLUP);
}

void loop() {
  controlaLed1();
  controlaLed2();
  controlaLed3();
}

void controlaLed1() {
  static unsigned long delayPisca;  

  // Menor que 500 milisegundos
  if ( (millis() - delayPisca) < 500 ) {
      digitalWrite(pinLed1, HIGH);
  } else {
      digitalWrite(pinLed1, LOW);
  }

  if ( (millis() - delayPisca) >= 1000 ) {
    delayPisca = millis(); 
  }
}


void controlaLed2() {
   digitalWrite(pinLed2, !digitalRead(pinBotao1) );
}


void controlaLed3() {
  static byte estado = 1;
  static unsigned long delayBouce;
  static bool estadoBotao = true;
  static bool estadoAntBotao = true;

  static unsigned long delayPisca;  

  estadoBotao = digitalRead(pinBotao2); 
  if ((!estadoBotao && estadoAntBotao) && ((millis() - delayBouce) > 100)) {
     estado++;
     if (estado > 3) {
        estado = 1; 
     }
     delayBouce = millis();
  }
  estadoAntBotao = estadoBotao;

  switch (estado) {
    case 1: {
       digitalWrite( pinLed3, LOW);
       break;
    }

    case 2: {
       digitalWrite( pinLed3, HIGH);
       break;       
    }

    case 3: {
       if ( (millis() - delayPisca) < 200 ) {
          digitalWrite( pinLed3, HIGH);
       }

       if ( ((millis() - delayPisca) >= 200) && ((millis() - delayPisca) < 400) ) {
           digitalWrite( pinLed3, LOW);
       }      

       if ( ((millis() - delayPisca) >= 400) && ((millis() - delayPisca) < 600) ) {
          digitalWrite( pinLed3, HIGH);
       };       

       if ( ((millis() - delayPisca) >= 600) && ((millis() - delayPisca) < 800) ) {
          digitalWrite( pinLed3, LOW);
       }       

       if ( (millis() - delayPisca) > 1800 ) {
          delayPisca = millis();
       }  

       break;     
    } 
  }
}
```


## Expandindo portas (CI c/ funcao Shift Register)
> Ligando com 3 portas digitais no arduino ele permite controlar 8 portas digitais no modo OUTPUT

- O capacitor na porta 12 é para se existir alguma variacao na porta nao vai interferir na comunicao, capacitor apenas para estabilizacao da comunicacao usar um de 1uf
- A porta 14 do primeiro quando tem mais de um ci ligado fica responsavel por controlar a ordem das portas e mandando pela sua porta 9 a informacao para a porta 14 do proximo ci e assim por diante para todos os ci's que tiverem

![Shift Register](/shiftregister.png)

```js
#define pinSH_CP 9   //Pino Clock
#define pinST_CP 10  //Pino Latch
#define pinDS    11  //Pino Data
#define qtdeCI   3

void ci74HC595Write(byte pino, bool estado);

void setup() {
   pinMode(pinSH_CP, OUTPUT);
   pinMode(pinST_CP, OUTPUT);
   pinMode(pinDS, OUTPUT);
}

void loop() {

  for (int nL=0; nL<24; nL++) {
      ci74HC595Write(nL, HIGH);
      delay(100); 
      ci74HC595Write(nL, LOW);
  }



  for (int nL=0; nL<8; nL++) {
      ci74HC595Write(nL, HIGH);
  }
  delay(1000);
  for (int nL=0; nL<8; nL++) {
      ci74HC595Write(nL, LOW);
  }
  for (int nL=8; nL<16; nL++) {
      ci74HC595Write(nL, HIGH);
  }
  delay(1000);
  for (int nL=8; nL<16; nL++) {
      ci74HC595Write(nL, LOW);
  }
  for (int nL=16; nL<24; nL++) {
      ci74HC595Write(nL, HIGH);
  }
  delay(1000);
  for (int nL=16; nL<24; nL++) {
      ci74HC595Write(nL, LOW);
  }
  delay(500);


  for (int nP=0; nP<5; nP++) {
      for (int nL=0; nL<24; nL++) {
          ci74HC595Write(nL, HIGH);
      }
      delay(100);
      for (int nL=0; nL<24; nL++) {
          ci74HC595Write(nL, LOW);
      }
      delay(100);
  }
  delay(400);


  for (int nP=0; nP<3; nP++) {
    for (int nL=0; nL<24; nL++) {
        ci74HC595Write(nL, HIGH);
        delay(10); 
    }
    for (int nL=23; nL>=0; nL--) {
        ci74HC595Write(nL, LOW);
        delay(10); 
    }
  }
   
}

void ci74HC595Write(byte pino, bool estado) {
static byte ciBuffer[qtdeCI];

bitWrite(ciBuffer[pino / 8], pino % 8, estado);

digitalWrite(pinST_CP, LOW); //Inicia a Transmissão

digitalWrite(pinDS, LOW);    //Apaga Tudo para Preparar Transmissão
digitalWrite(pinSH_CP, LOW);

for (int nC = qtdeCI-1; nC >= 0; nC--) {
    for (int nB = 7; nB >= 0; nB--) {

        digitalWrite(pinSH_CP, LOW);  //Baixa o Clock      
        
        digitalWrite(pinDS,  bitRead(ciBuffer[nC], nB) );     //Escreve o BIT
        
        digitalWrite(pinSH_CP, HIGH); //Eleva o Clock
        digitalWrite(pinDS, LOW);     //Baixa o Data para Previnir Vazamento      
    }  
}

digitalWrite(pinST_CP, HIGH);  //Finaliza a Transmissão

}
```


## Monitor Serial
![Monitor Serial 1](/monitorserial1.png)


Exemplo ligando led com arduino recebendo dado via monitor serial. Mandar de 1 até 3 no monitor serial para ligar os leds, pode mandar varios ao mesmo tempo
```js
// Recebe as informacoes da serial
int recebido = 0;

// Setando o valor inicial e nao as portas
int statusLed1 = LOW;
int statusLed2 = LOW;
int statusLed3 = LOW;

void setup()
{
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
}

void loop()
{
  // Verificando se a serial foi iniciada e tem alguma informacao
  if (Serial.available() > 0) {
  	// Recebendo valores
    recebido = Serial.read();
    
    // Verificar o que veio
    switch (recebido) {
      case '1':
      	if (statusLed1 == HIGH) {statusLed1 = LOW;} else {statusLed1 = HIGH;}
      	digitalWrite(2, statusLed1);
      	break;
      case '2':
      	if (statusLed2 == HIGH) {statusLed2 = LOW;} else {statusLed2 = HIGH;}
      	digitalWrite(3, statusLed2);
      	break;
      case '3':
      	if (statusLed3 == HIGH) {statusLed3 = LOW;} else {statusLed3 = HIGH;}
      	digitalWrite(4, statusLed3);
      	break;
    }
  }
}
```


## Servo motor
![Servo Motor](/servomotor.png)

Possui tres fios:
- vermelho: Alimentacao do servo (Tensão positiva), varia de motor para motor.
- marrom/preto: GND
- amarelo/outra cor: Sinal, onde envia o possicionamento (anglo que vai de 0 até 180 graus) do motor

Para trabalhar com servo é preciso usar a biblioteca que ja vem com a IDE do Arduino, a ```Servo.h```

Exemplo com servo de 5v
```js
// Biblioteca de servo motor
#include <Servo.h>

// Instanciando a classe Servo passando um nome
Servo motor1;

// Angulo de inclinacao/possicao do eixo do motor
int possicaoMotor = 0;

void setup()
{
  // Informando qual o pino que o motor esta
  motor1.attach(3);
}

void loop()
{
  // Definindo a possicao do eixo
  // O valor vai de 0 até 180 (graus)
  motor1.write(10);
}
```

Exemplo com servo de 5v rotacionando de 0 até 180 acrescentando 45 graus por rotacao
```js
// Biblioteca de servo motor
#include <Servo.h>

// Instanciando a classe Servo passando um nome
Servo motor1;

// Angulo de inclinacao/possicao do eixo do motor
int possicaoMotor = 0;

void setup()
{
  // Informando qual o pino que o motor esta
  motor1.attach(3);
}

void loop()
{
  // No final retorna para a possicao inicial e comecao novamente o loop
  for (possicaoMotor = 0; possicaoMotor < 180; possicaoMotor+=45) {
    motor1.write(possicaoMotor);
    delay(2000);
  }
  for (possicaoMotor = 180; possicaoMotor > 0; possicaoMotor-=45) {
    motor1.write(possicaoMotor);
    delay(2000);
  }
}
```


## Display OLED (Direitos Flavio Guimaraes)
> Existem o I2C e o SPI

- I2C: Duas portas apenas para comunicao (No UNO são a A4'SDA' e A5'SCL')
- SPI: Varias portas para comunicao


![Display OLED I2C Modelo 1](/display_oled_12c_modelo1.png)
![Display OLED SPI Modelo 2](/display_oled_12c_modelo2.png)

Exemplo usando o modelo 1 (I2C)

Para poder desenvolver, baixar a biblioteca [MicroLCD](/MicroLCD.zip) e o programa (LCD Assistant)[/LCDAssistant.zip] para gerar o ... da imagem []().
```js
/****************************************************************************************
  Video Q0174 - Módulos para Arduino - Micro LCD OLED
  
  Desenvolvido pela Fábrica de Programas - Brincando com Ideias (www.brincandocomideias.com)
  www.youtube.com/c/BrincandoComIdeias

  Autor Flavio Guimaraes  
*****************************************************************************************/ 

//BIBLIOTECAS
#include <Arduino.h>
#include <Wire.h>
#include <MicroLCD.h>


//CONFIGURACAO DO DISPLAY MICRO LCD
// Verificar qual o Controlador do seu display (LCD_SH1106 ou LCD_SSD1306)
LCD_SH1106 lcd; /* para módulo controlado pelo CI SH1106 OLED */ 
//LCD_SSD1306 lcd; /* para módulo contralado pelo CI SSD1306 OLED */

// Exemplo de como mandar uma img para o display
// Array de um byte em HEX, a soma de todos vai dar 48px x 48px
// Pegar uma img e converter para monocromatico (bmp monocromatico), usar ela no LCD Assistant
// Depois no porgrama ainda deixe em Byte orientation como vertical
// Depois os tamanhos 48 x 48
// Depois Size endianness com Litlle
// Depois de em Pixels deixe com 8
// Deppis de um nome (Sera usado como o nome do array)
// Depois File > Save
// Abra o arquivo com o bloco de notas e copie o conteudo e altere dentro deste array
// Atentar que deve ser uma const pois nunca muda, armazenada na PROGMEM para nao acabar com a memoria do arduino e é do tipo inteiro uint8_t
/*
    Este calculo de dentro do array é o seguinte
    Digamos que tenho uma img 10x10, logo vai dar 100 que é 100px
    Dividindo por 8, pois dentro de cada byte tem a informacao de 8px,
       ou seja, um byte é igual 8 bit e um px monocromatico é 8bit
*/
const PROGMEM uint8_t logo[48 * 48 / 8] = {
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80, 0xC0, 0xC0, 0xE0, 0xE0,
0xF0, 0xF0, 0xF8, 0xF8, 0xF8, 0xF8, 0xF8, 0x18, 0x18, 0xF8, 0xF8, 0xF8, 0xF8, 0xF8, 0xF0, 0xF0,
0xE0, 0xE0, 0xC0, 0xC0, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0xF0, 0xF8, 0xFC, 0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xF8,
0xF1, 0x73, 0x1F, 0x0F, 0x0F, 0x07, 0x07, 0x06, 0x04, 0x07, 0x07, 0x0F, 0x0F, 0x1F, 0x63, 0xF1,
0xF8, 0xFD, 0xFF, 0xFF, 0xFF, 0xFF, 0xFE, 0xFC, 0xF8, 0xF0, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0xF0, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xF9, 0xF9, 0xF9, 0xF9, 0xFF,
0xFF, 0x00, 0x00, 0x00, 0x80, 0x80, 0x80, 0x80, 0x00, 0x80, 0x80, 0x80, 0x80, 0x00, 0x00, 0xFF,
0xFF, 0xF9, 0xF9, 0xF9, 0xF9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xF0, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x07, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F,
0x7F, 0x00, 0x00, 0x40, 0x7F, 0x4F, 0x0F, 0x03, 0x00, 0x0F, 0x4F, 0x7F, 0x7F, 0x00, 0x00, 0x7F,
0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F, 0x07, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x07, 0x0F, 0x1F, 0x3F, 0x7F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFC,
0xF8, 0xF8, 0x08, 0x04, 0x00, 0xF8, 0xF8, 0xF8, 0xF8, 0xF8, 0xF8, 0x00, 0x04, 0x08, 0xF8, 0xF8,
0xFC, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F, 0x3F, 0x1F, 0x0F, 0x07, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x03, 0x03,
0x07, 0x07, 0x0E, 0x0E, 0x0E, 0x0F, 0x0F, 0x1F, 0x1F, 0x0F, 0x0F, 0x08, 0x08, 0x0C, 0x07, 0x07,
0x07, 0x03, 0x03, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
};


//***********************************************************************************************
void setup()
{
	lcd.begin();
}


//***********************************************************************************************
void loop()
{
    // Limpando a tela
  lcd.clear();

  // A diferenca aqui para o LCD normal é q no LCD normal é caracter e aqui é pixel
  lcd.setCursor(40, 1);

  // Desenhando a img
  lcd.draw(logo, 48, 48);
  delay(1000);

  lcd.clear();
  lcd.setFontSize(FONT_SIZE_SMALL);
  lcd.println("Ola, Mundo!");
  lcd.setFontSize(FONT_SIZE_MEDIUM);
  lcd.println("Ola, Mundo!");
  delay(1000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.setFontSize(FONT_SIZE_SMALL);
  lcd.printLong(12345678);
  delay(1000);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.setFontSize(FONT_SIZE_MEDIUM);
  lcd.printLong(12345678);
  delay(1000);

  lcd.clear();
  lcd.setCursor(0, 0);
  // Nesta biblioteca funciona apenas para printLong
  lcd.setFontSize(FONT_SIZE_LARGE);
  lcd.printLong(12345678);
  delay(1000);

  lcd.clear();
  lcd.setCursor(0, 0);
  // Nesta biblioteca funciona apenas para printLong
  lcd.setFontSize(FONT_SIZE_XLARGE);
  lcd.printLong(12345678);
  delay(1000);
}

```


## Teclado matricial (Membrana)
![Teclado Matricial](/tecladomatricial.png)

No teclado 4x4 (16 teclas) temos 4 linhas e 4 colunas, onde temos os terras nos pinos 5 ao 8 e as entras digitais 1 ao 4.

No teclado 4x3 (12 teclas) temos 4 linhas e 2 colunas, onde temos os terras nos pinos 5 ao 7 e as entras digitais 1 ao 4.

No teclado 1x4 (4 teclas) temos 1 linhas e 4 colunas, onde temos o terra no pino 1 e as entras digitais 2 ao 5.

Caso os pinos nao funcionem usar um multimetro para saber os pinos dos botoes.

Exemplo sem biblioteca
```js
// A ordem dos pinos com as portas [linha 1, linha 2, linha 3 e linha 4]
int pinosLinhas[]  = {11,10,9,8};
// A ordem dos pinos com as portas [coluna 1, coluna 2, coluna 3 e coluna 4]
int pinosColunas[] = {7,6,5,4};
char teclas[4][4] = {{'1','2','3','A'},
                     {'4','5','6','B'},
                     {'7','8','9','C'},
                     {'*','0','#','D'}};

void setup()
{
  for (int nL = 0; nL <= 3; nL++) {
     pinMode(pinosLinhas[nL], OUTPUT);
     digitalWrite(pinosLinhas[nL], HIGH);
  }

  for (int nC = 0; nC <= 3; nC++) {
     pinMode(pinosColunas[nC], INPUT_PULLUP);
  } 
   
  Serial.begin(9600);
  Serial.println("Teclado 4x4");
  Serial.println("Aguardando acionamento das teclas...");
  Serial.println();
}
 
void loop()
{
    //faz varredura em todas as linhas, desligando uma de cada vez
    for (int nL = 0; nL <= 3; nL++)
    {
      digitalWrite(pinosLinhas[nL], LOW);
      
      //faz varredura em todas as colunas verificando se tem algum botao apertado
      for (int nC = 0; nC <= 3; nC++) {
        if (digitalRead(pinosColunas[nC]) == LOW)
        {
          Serial.print("Tecla: ");
          Serial.println(teclas[nL][nC]);
          while(digitalRead(pinosColunas[nC]) == LOW){}
        }
      }

      digitalWrite(pinosLinhas[nL], HIGH);
    }
   delay(10);
}
```

Exemplo com biblioteca, baixar [aqui](/Keypad.zip)
```js
#include <Keypad.h>
byte pinosLinhas[]  = {10,5,6,8};

byte pinosColunas[] = {9,11,7};

char teclas[4][3] = {{'1','2','3'},
                     {'4','5','6'},
                     {'7','8','9'},
                     {'*','0','#'}};
// Cria uma instancia do tipo Keypad
// A funcao Keypad recebe como parametro 1 o array de teclas, 2 o pinos das linhas
// Como 3 o pinos das colunas, como 4 a quantidade de linhas e no 5 a quantidade de colunas
Keypad teclado1 = Keypad( makeKeymap(teclas), pinosLinhas, pinosColunas, 4, 3);  

void setup() {
  Serial.begin(9600);
  Serial.println("Teclado 4x4 com Biblioteca Keypad");
  Serial.println("Aguardando acionamento das teclas...");
  Serial.println();
}

void loop() {
  //Verifica se alguma tecla foi pressionada
  char tecla_pressionada = teclado1.getKey();
  
  //Mostra no serial monitor o caracter da matriz,
  //referente a tecla que foi pressionada
  if (tecla_pressionada)
  {
    Serial.print("Tecla: ");
    Serial.println(tecla_pressionada);
  } 
}
```


## Sleep Mode
Colocar o arduino para dormir diminuindo o consumo da bateria

![Sleep Mode](/sleepmode.png)

```js
// Biblioteca
#include <avr/sleep.h>

const pinoBotao 2;
const pinoLed 7;

bool estadoBUILTIN = false;

// Declarando a funcao
void mimi();

void setup() {
  Serial.begin(9600);
  Serial.println("Iniciando setup()");

  pinMode(pinoLed, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(pinoBotao, INPUT_PULLUP);

  digitalWrite(pinoLed, LOW);

  Serial.println("Fim setup()");
}

void loop() {
  Serial.println("Ligando o LED");
  digitalWrite(pinoLed, HIGH);
  delay(5000);
  Serial.println("Partiu mimi");
  digitalWrite(pinoLed, LOW);

  mimi();
  Serial.println("Arduino Acordado!");

  estadoBUILTIN = !estadoBUILTIN;
  digitalWrite(LED_BUILTIN, estadoBUILTIN);

  delay(2000);
}

void mimi() {
  // Se nao for a low da erro e trava 
  attachInterrupt(digitalPinToInterrupt(pinoBotao), disperta, LOW);

  set_sleep_mode(SLEEP_MODE_PWR_DOWN);
  sleep_enable();

  delay(1000);

  sleep_cpu();
}

void disperta() {
  Serial.println("Interrupção ativada, acordando arduino");
  sleep_disable();
  detachInterrupt(digitalPinToInterrupt(pinoBotao) );
}
```