# Arduino

– Microcontrolador: ATmega328
– Tensão de Operação: 5V
– Tensão de Entrada: 7-12V
– Portas Digitais: 14 (6 podem ser usadas como PWM)
– Portas Analógicas: 6
– Corrente Pinos I/O: 40mA
– Corrente Pinos 3,3V: 50mA
– Memória Flash: 32KB (0,5KB usado no bootloader)
– SRAM: 2KB
– EEPROM: 1KB
– Velocidade do Clock: 16MHz

## Alimentacao
Para alimentar o arduino podemos fazer das seguintes formas (7v até 12v):

- Cabo USB
- Bateria
- Pino VIM
- Carregador (9v/1a é o ideal), para circuitos basico 1A esta tranquilo, mas se for projetos grandes o amper vai ter q ser mais

O arduino possui nas suas portas digitais a tensao de 0v sem usar e 5v usando e nas analogicas a variacao de 0 até 5.

Cada porta suporta até 40mA, maso arduino nao pode passar de 200mA no total, logo nao são 40mA por porta se tiver usando todas.

## Pino VIM
Podemos utilizar para energizar algum sistema externo ou até mesmo o proprio arduino

O VIM tera sempre a tensao de entrada no arduino, se ligarmos o arduino com uma bateria de 12v teremos 12v no VIM, coisa que nao acontece nos pinos 5v que sempre sera regulado para 5v

Se ligarmos o arduino no USB a saida no VIM sera de 5v pois o USB é regulado para 5v.

Para sistemas externos que precisam de mais q 5v e estamos usando uma fonte externa, podemos usar o VIM para alimentar.

Tambem podemos alimentar o arduino por meio do VIM, no lugar de plugar uma fonte nele podemos ligar um fio no GND e outra no VIM (Positivo). Isso é muito comum de se usar quando temos uma shield que tbm é energizada, assim podemos eliminar ter q ligar o arduino em uma fonte e ser alimentada pela shield que vai estar plugado nela

O unico cuidado que tem que se ter é q a fonte externa não tenha menos que 7v ou mais que 12v

## Pino AREF
As portas analogicas trabalham com variacao de 0v até 5v, e podemos receber valores de sensores analogicos por meio destes pinos.

Normalmente trabalhamos com sensores que variam a sua tensao analogica de 0v até 5v.

Se em algum momento algum sensor precise de um analogico que nao trabalhe com 5v, por exemplo 3.3v, agora a sua variacao é de 0v até 3.3v.

Se formos usar o pino analogico de 5v para enviar 3.3v estaremos perdendo precisao na leitura do sensor.

Para isso podemos usar esta porta AREF aplicando a tensao maxima que precisamos.

Ela por padrao trabalha com a tensao de alimentacao da placa que é 5v quando nao estamos usando ela, ou seja, se receber uma tensao de 5v é a mesma coisa que se nao tivesse nada conectado nele.

Podemos aplicar uma tensao de 3.3v ao AREF e as portas analogicas passam receber esta nova tensao.

As portas analogicas nao podem receber menos que 0v e mais que 5v.