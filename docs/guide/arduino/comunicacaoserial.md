# Comunicacao Serial
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