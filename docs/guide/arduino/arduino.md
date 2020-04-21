# Arduino

## Alimentar
Para alimentar o arduino podemos fazer das seguintes formas (7v até 12v):

- Cabo USB
- Bateria
- Pino VIM
- Carregador (9v é o ideal)

O arduino 


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

