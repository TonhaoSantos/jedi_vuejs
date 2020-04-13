# Projetos

## LCD 16x2
> Alguns LCD's podem nao vir com um resistor no pino 15(A/Led 1), podemos usar dois resistores de **165 Ohms** sem serie

![Image description](/LCD_16x2.png)

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
```c
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