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