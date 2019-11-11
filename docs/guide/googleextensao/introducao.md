# Introducao
[Documentacao Google](https://developer.chrome.com/extensions)

Para criar uma extensão a primeira etapa é criar um arquivo de manifesto chamado **manifest.json**.

Este é um arquivo de metadados no formato JSON que contém propriedades como:
- nome da extensão
- descrição
- número da versão
- e muito mais

Neste arquivo, informamos ao Chrome o que a extensão fará e quais permissões requerir.

```js
{
  "manifest_version": 2,
  "name": "Nome",
  "version": "1.0",
  "description": "Descricao",
  "author": "Jake Prins",
  "browser_action": {
    "default_popup": "index.html",
    "default_icon": "tab-icon.png",
    "default_title": "Have a good day"
  }
}


// Se for para abrir em uma nova aba remover "default_popup": "index.html" e incluir

{
  "chrome_url_overrides" : {  "newtab": "newtab.html"},
  "permissions": ["activeTab"]
}
```

Proximo passo sera criar o arquivo HTML que contera o conteudo da extensão. É um HTML puro.

Um exemplo de HTML:
```html
<!doctype html>
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

Para testar é só ir neste endereco [chrome://extensions](chrome://extensions), habilitar o modo desenvolvedor, clicar em **Carregar extensão descompactada** e selecionar o repositorio raiz do projeto.

Se der tudo certo a extensão será carregada na barra de extensões e estara pronta para ser usada, caso de erro e dependendo de qual erro deu o chrome informa.

Pode inportar js e css conforme uma pagina web normal.

```html
<script src="script.js"></script>
```

Para publicar no **Chrome Store** clicar [aqui](https://chrome.google.com/webstore/developer/dashboard) para acessar o **painel da Chrome Web Store** (será solicitado login na sua conta do Google, se não estiver).

Em seguida, clique no "Adicionar novo item", _aceite os termos_ e você irá para a página onde você pode enviar sua extensão.

Agora compacte a pasta que contém o seu projeto e faça o upload desse arquivo ZIP.

Estando o upload **ok** surgirá um formulário no qual temos que adicionar algumas informações sobre sua extensão.

- Icone
- Descrição
- Upload de algumas capturas de tela
- E muito mais

Na loja, clicando em **Previa** da para visualizar a aparencia da extensão e se estiver satisfeito clicar em **Publicar Modificacões**.

Vá na **Chrome Web Store** e procure a extensão pelo título (pode para aparecer na loja).

Agora resta apenas compartilhar.

## Minhas extensões

https://gitlab.com/vlalg/vlalg-valid-fake-generator