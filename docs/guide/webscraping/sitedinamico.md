# Site Dinamico e SPA

## Exemplo 1
Para inicio do projeto, criar um diretorio para o mesmo e dentro criar dele digitar ```yarn init```.

Criar um arquivo **index.js**

Instalar as dependencias
```js
yarn add cheerio nightmare
```

O conteudo do index.js será este
```js
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const nightmare = Nightmare({ show: true })
const url = 'https://algumsite.com.br';

// Request making using nightmare
nightmare
  .goto(url)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
.then(response => {
  console.log(getData(response));
}).catch(err => {
  console.log(err);
});

// Parsing data using cheerio
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
    data.push({
      title : $(elem).text(),
      link : $(elem).find('a.storylink').attr('href')
    });
  });
  return data;
}
```

## Exemplo 2 - Mostra como abrir um popup

```js
const Nightmare = require('nightmare');
require('nightmare-window-manager')(Nightmare)
const cheerio = require('cheerio');

var nightmare = Nightmare({ 
  /*
  openDevTools: {
    mode: 'detach'
  },
  */
  show: true
})
const url = 'https://algumsite.com.br';

// Request making using nightmare
nightmare
  .windowManager()
  .goto(url)
  .wait('body')
  .click('button.social-provider-btn.msft')
  .waitWindowLoad()
  .focusWindow(2)
  .closeWindow(1)
  .wait('body')
  // .wait('body.cb.DejaVue')
  // .click('input.form-control ltr_override')    
  // .evaluate(() => document.querySelector('div.wrapper input').innerHTML)
  // .end()
  .then(response => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  });

// Parsing data using cheerio
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  $('div._1HmYoV._35HD7C:nth-child(2) div.bhgxx2.col-12-12').each((row, raw_element) => {
    $(raw_element).find('div div div').each((i, elem) => {
      let title = $(elem).find('div div a:nth-child(2)').text();
      let link = $(elem).find('div div a:nth-child(2)').attr('href');
      if (title) {
        data.push({
          title : title,
          link : link
        });
      }
    });
  });
  return data;
}
```

No package.json incluir um script que rode o comando ```yarn index.js```.