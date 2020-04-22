# Modulos

## Ethernet Shield

### Exemplo 1 (Pagina simples)

Conectando o shield no arduino e fornecendo o IP na linha 5:
```js
IPAddress ip(???, ???, ???, ???)
```

```js
#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 0, 40); // Endereço IP que a Ethernet Shield terá. Deve ser alterado para um endereço livre da sua rede.
EthernetServer server(80);     // Cria um servidor WEB

void setup() {
    Ethernet.begin(mac, ip);  // Inicializa a Ethernet Shield
    server.begin();           // Inicia esperando por requisições dos clientes (Browsers)
} // fim do setup

void loop() {

    EthernetClient client = server.available();  // Tenta pegar uma conexão com o cliente (Browser)

    if (client) {  // Existe um cliente em conexão ?
      
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) {   // os dados do cliente estão disponiveis para serem lidos
                char c = client.read(); // lê 1 byte (character) do cliente
                
                // a ultima linha da requisição do cliente é branca e termina com o caractere \n
                // responde para o cliente apenas após a última linha recebida
                if (c == '\n' && currentLineIsBlank) {
                  
                    // envia o cabeçalho de uma resposta http padrão
                    client.println("HTTP/1.1 200 OK");
                    client.println("Content-Type: text/html");
                    client.println("Connection: close");
                    client.println();
                    
                    // ENVIA A PÁGINA WEB
                    client.println("<!DOCTYPE html>");
                    client.println("<html>");
                    client.println("<head>");
                    client.println("<title>P&aacute;gina do Arduino</title>");
                    client.println("</head>");
                    client.println("<body>");
                    client.println("<h1>Ol&aacute; sendo enviado pelo Arduino!</h1>");
                    client.println("<p>Esta &eacute; a minha primeira p&aacute;gina web no Ethernet Shield</p>");
                    client.println("<p>##### Brincando com Ideias na Internet #####</p>");
                    client.println("</body>");
                    client.println("</html>");
                    break;
                }
                // toda linha de texto recebida do cliente termina com os caracteres \r\n
                if (c == '\n') {
                    // ultimo caractere da linha do texto recebido
                    // iniciando nova linha com o novo caractere lido
                    currentLineIsBlank = true;
                } 
                else if (c != '\r') {
                    // um caractere de texto foi recebido do cliente
                    currentLineIsBlank = false;
                }
            } // fim do if (client.available())
        } // fim do while (client.connected())
        
        delay(1);      // da um tempo para o WEB Browser receber o texto
        client.stop(); // termina a conexão
        
    } // fim do if (client)
} // fim do loop
```

Para testar é só ir no navegador e digitar o mesmo IP.

Outro exemplo, mas servindo de um servidor de paginas, onde as paginas estao no SD.
```js
#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(169, 254, 182, 77);  // Endereço IP que a Ethernet Shield terá. Deve ser alterado para um endereço livre da sua rede.
EthernetServer server(80);      // Cria um servidor WEB na porta 80

File webFile;

void setup()
{
    Ethernet.begin(mac, ip);  // Inicializa a Ethernet Shield
    server.begin();           // Inicia esperando por requisições dos clientes (Browsers)
    Serial.begin(9600);       // Inicia a comunicação Serial
    
    // inicia o leitor de cartão SD
    Serial.println("Iniciando o cartao SD...");
    if (!SD.begin(4)) {
        Serial.println("ERRO - a inicializacao do cartao SD falhou!");
        return;    //aborta a função SETUP caso exista erro
    }
    
    Serial.println("Cartao iniciado com SUCESSO!!");
    // verifica a existencia do arquivo index.htm no cartao SD
    if (!SD.exists("index.html")) {
        Serial.println("ERRO - O arquivo index.htm nao foi localizado!");
        return;   //aborta a função SETUP caso exista erro
    }
    
    Serial.println("Arquivo index.htm encontrado!");
}


void loop()
{
    EthernetClient client = server.available();  // Tenta pegar uma conexão com o cliente (Browser)

    if (client) {  // Existe um cliente em conexão ?
      
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) {   // os dados do cliente estão disponiveis para serem lidos
                char c = client.read(); // lê 1 byte (character) do cliente
                
                // a ultima linha da requisição do cliente é branca e termina com o caractere \n
                // responde para o cliente apenas após a última linha recebida
                if (c == '\n' && currentLineIsBlank) {
                  
                    // envia o cabeçalho de uma resposta http padrão
                    client.println("HTTP/1.1 200 OK");
                    client.println("Content-Type: text/html");
                    client.println("Connection: close");
                    client.println();

                    // ENVIA A PÁGINA WEB
                    webFile = SD.open("index.html");        // abre o arquivo da pagina WEB
                    if (webFile) {
                        while(webFile.available()) {
                            client.write(webFile.read());  // envia a pagina WEB para o cliente (browser)
                        }
                        webFile.close();
                    }
                    break;
                }
                
                // toda linha de texto recebida do cliente termina com os caracteres \r\n
                if (c == '\n') {
                    // ultimo caractere da linha do texto recebido
                    // iniciando nova linha com o novo caractere lido
                    currentLineIsBlank = true;
                } 
                else if (c != '\r') {
                    // um caractere de texto foi recebido do cliente
                    currentLineIsBlank = false;
                }
            } // fim do if (client.available())
        } // fim do while (client.connected())
        
        delay(1);      // da um tempo para o WEB Browser receber o texto
        client.stop(); // termina a conexão

    } // fim do if (client)
} // fim do loop
```


Outro exemplo, ligando leds pelo servidor.
```js

#include <SPI.h>
#include <Ethernet.h>

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };   //Definição do MAC Address da Ethernet Shield
IPAddress ip(169, 254, 22, 100);                       // Definição do endereço IP que a Ethernet Shield terá na rede onde estiver conectada. Verifique a Máscara-de-subrede e todos os equipamentos conectados na rede para achar um IP compatível e livre.
EthernetServer server(80);                             // Porta em que a Ethernet Shield irá receber as requisições das páginas (o padrão WEB é a porta 80)

String HTTP_req; 
String URLValue;

void processaPorta(byte porta, byte posicao, EthernetClient cl);
String getURLRequest(String *requisicao);
bool mainPageRequest(String *requisicao);

const byte qtdePinosDigitais = 11;
byte pinosDigitais[qtdePinosDigitais] = {2           , 3     , 5     , 6     , 7     , 8     , 9     , A2    , A3    , A4    , A5};
byte modoPinos[qtdePinosDigitais]     = {INPUT_PULLUP, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT, OUTPUT};

const byte qtdePinosAnalogicos = 2;
byte pinosAnalogicos[qtdePinosAnalogicos] = {A0, A1};

void setup()
{
    Ethernet.begin(mac, ip); 
    server.begin();           
    Serial.begin(9600);       

    for (int nL=0; nL < qtdePinosDigitais; nL++) {
        pinMode(pinosDigitais[nL], modoPinos[nL]);
    }
}

void loop()
{
    EthernetClient client = server.available();

    if (client) { 
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) { 
                char c = client.read(); 
                HTTP_req += c;  
                
                if (c == '\n' && currentLineIsBlank ) { 

                    if (mainPageRequest(&HTTP_req)) {
                        URLValue = getURLRequest(&HTTP_req);
                                                 
                        client.println("HTTP/1.1 200 OK");
                        client.println("Content-Type: text/html");
                        client.println("Connection: close");
                        client.println();
                        
                        //Conteudo da Página HTML
                        client.println("<!DOCTYPE html>");
                        client.println("<html>");
                        client.println("<head>");
                        client.println("<title>Arduino via WEB</title>");
                        client.println("</head>");
                        client.println("<body>");
                        client.println("<h1>PORTAS EM FUN&Ccedil;&Atilde;O ANAL&Oacute;GICA</h1>");

                        for (int nL=0; nL < qtdePinosAnalogicos; nL++) {
                            client.print("Porta A");
                            client.print(pinosAnalogicos[nL] - 14);
                            client.print(" - Valor: ");
                            client.println( analogRead(pinosAnalogicos[nL]) );
                            client.println("<br/>");                             
                        }
                        
                        client.println("<br/>");                        
                        client.println("<h1>PORTAS EM FUN&Ccedil;&Atilde;O DIGITAL</h1>");
                        client.println("<form method=\"get\">");

                        for (int nL=0; nL < qtdePinosDigitais; nL++) {
                            processaPorta(pinosDigitais[nL], nL, client);
                            client.println("<br/>");
                        }
                        
                        client.println("<br/>");
                        client.println("<button type=\"submit\">Envia para o Arduino</button>");
                        client.println("</form>");

                           //Específico para Exemplificar
                           client.println("<br/>");
                           client.println("<br/>");
                        
                            client.print("Porta A0: ");
                            client.print( map(analogRead(A0),0,1023,0,179) );
                            client.println(" graus");
                            client.println("<br/>");                             

                            client.print("Porta A1: ");
                            float voltagem = analogRead(A1) * 5.0 / 1024.0;
                            client.print( (voltagem - 0.5) * 10 );
                            client.println(" graus cent&iacute;grados");
                            client.println("<br/>");                             

                            client.println("<br/>");                             
                     
                        
                        client.println("</body>");
                        client.println("</html>");
                        
                    } else {
                        client.println("HTTP/1.1 200 OK");
                    }
                    HTTP_req = "";    
                    break;
                }
                
                if (c == '\n') {
                    currentLineIsBlank = true;
                } 
                else if (c != '\r') {
                    currentLineIsBlank = false;
                }
            }
        } 
        delay(1);     
        client.stop(); 
    } 
}


void processaPorta(byte porta, byte posicao, EthernetClient cl)
{
static boolean LED_status = 0;
String cHTML;

    cHTML = "P";
    cHTML += porta;
    cHTML += "=";
    cHTML += porta;

    if (modoPinos[posicao] == OUTPUT) { 
        
        if (URLValue.indexOf(cHTML) > -1) { 
           LED_status = HIGH;
        } else {
           LED_status = LOW;
        }
        digitalWrite(porta, LED_status);
    } else {

        LED_status = digitalRead(porta);
    }
        
    cHTML = "<input type=\"checkbox\" name=\"P";
    cHTML += porta;
    cHTML += "\" value=\"";
    cHTML += porta;
    
    cHTML += "\"";
    //cHTML += "\" onclick=\"submit();\"";

    if (LED_status) { 
        cHTML += " checked ";
    }

    if (modoPinos[posicao] != OUTPUT) { 
        cHTML += " disabled ";
    }
    
    cHTML += ">Porta ";

    if (porta <= 13) {
       cHTML += porta;
    } else {
       cHTML += "A";
       cHTML += porta - 14;
    }
    cl.println(cHTML);
}


String getURLRequest(String *requisicao) {
int inicio, fim;
String retorno;

  inicio = requisicao->indexOf("GET") + 3;
  fim = requisicao->indexOf("HTTP/") - 1;
  retorno = requisicao->substring(inicio, fim);
  retorno.trim();

  return retorno;
}

bool mainPageRequest(String *requisicao) {
String valor;
bool retorno = false;

  valor = getURLRequest(requisicao);
  valor.toLowerCase();

  if (valor == "/") {
     retorno = true;
  }

  if (valor.substring(0,2) == "/?") {
     retorno = true;
  }  

  if (valor.substring(0,10) == "/index.htm") {
     retorno = true;
  }  

  return retorno;
}
```