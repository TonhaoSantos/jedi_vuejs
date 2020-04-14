# Projetos

## LCD 16x2
> Alguns LCD's podem nao vir com um resistor no pino 15(A/Led 1), podemos usar dois resistores de **165 Ohms** sem serie

![LCD 16X2](/lcd_16_2.png)

Ligacoes
| Pino LCD  |  Funcao  |  Ligacao  |
|-----------|----------|-----------|
| 1         |  VSS     |  GND      |
| 2         |  VDD     |  VCC 5V   |
| 3         |  V0      |  Pino central potenciometro    |
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
![Potenciomentro](/Potenciomentro2.png)

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