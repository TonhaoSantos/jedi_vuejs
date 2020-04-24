# Comunicacao Serial
É usada para enviar informacao e receber informacao.

O arduino uno utiliza as portas 0 e 1 como comunicacao serial.

O pino tx é o pino de transmissao do arduino para o pc/monitor serial, se o arduino estiver conectado no usb é desta maneira que recebemos o que esta sendo enviado pelo Serial.println/outros no tx

O pino rx vem as coisas que vem de fora no arduino via monitor serial/pc/outros para o arduino

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

```js
#define SERIAL_BUFFER_SIZE 256

void setup() {
    // Comeca a comunicao via serial (Inicia a comunicacao serial)
    Serial.begin(9600);
}

// armazena apenas um caracter
char c;

void loop() {
    // Verifica se tem alguma coisa na serial
    // available recebe a quantidade de caracteres enviado
    // retorno de carro e quebra de linha tbm entram na contagem, remover no monitor se nao quiser
    if (Serial.available() > 0) {
       // Quantos ainda tem no buffer depois de sair um
       // é tam rapido que q nem vai dar para ler quanto falta, para testar dar um delay(700) no final do programa
       Serial.print(Serial.available());

       // Serial.read() retorna apenas um caracter de cada vez da serial
       // isso ocorre muito rapido q se enviarmos um texto grande nem percebemos
       // se nao der read os dados ficam no buffer do serial até ser lido
       // le um caracter por vez no buffer
       // o buffer tem um limite de 64 bytes (caracteres)
       // para aumentar para 256 o tamanho do buffer é só descomentar o define do comeco do programa
       // retorno de carro e quebra de linha tbm entram na contagem, remover no monitor se nao quiser
       // cada leitura sai um do buffer
       c = Serial.read();

       // imprimir seguido
       Serial.print(c); 

       // imprimir por linhas
       Serial.println(c); 
    }
}
```