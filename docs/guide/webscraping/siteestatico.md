# Site Estatico
## Exemplo 1
Para este exemplo vou construir Scraping para vasculhar um site de anuncio de vagas e obter as empresas que prestam serviços de impressão em Nova York na forma de um arquivo ".CSV" que deve ter o nome da empresa, email, telefone e colunas de links que descrevem cada empresa.

Os passos que vamos programar são estes:
- Navegar até o link X, insirir "impressão" e "Nova York" nos campos de pesquisa e execute a pesquisa
- Selecione e armazene o nome da primeira empresa na lista
- Armazene o link na página da empresa e entre no anuncio
- Encontre um endereço de email e armazene-o
- Gravar os valores obtidos em um arquivo ".CSV" usando um editor de texto ou outra ferramenta para editar tabelas como o Excel ou o Planilhas Google
- Repetir o processo

Para inicio do projeto, criar um diretorio para o mesmo e dentro criar dele digitar ```yarn init```.

Criar um arquivo **index.js**

Instalar as dependencias
```js
yarn add request request-promise cheerio objects-to-csv
```

O conteudo do index.js será este
```js
const rp = require('request-promise');
const otcsv = require('objects-to-csv');
const cheerio = require('cheerio');

const baseURL = 'https://algumsite.com.br';
const searchURL = '/search?search_terms=printing&geo_location_terms=New+York%2C+NY';

const getCompanies = async () => {
  const html = await rp(baseURL + searchURL);

  const businessMap = cheerio('a.business-name', html).map(async (i, e) => {
    const link = baseURL + e.attribs.href;
    const innerHtml = await rp(link);
    const emailAddress = cheerio('a.email-business', innerHtml).prop('href');
    const name = e.children[0].data || cheerio('h1', innerHtml).text();
    const phone = cheerio('p.phone', innerHtml).text();

    return {
      emailAddress: emailAddress ? emailAddress.replace('mailto:', '') : '',
      link,
      name,
      phone,
    }
  }).get();

  return Promise.all(businessMap);
};

getCompanies()
  .then(result => {
    const transformed = new otcsv(result);
    return transformed.toDisk('./output.csv');
  })
  .then(() => console.log('SUCCESSFULLY COMPLETED THE WEB SCRAPING SAMPLE'));
```

No package.json incluir um script que rode o comando ```yarn index.js```.

Ao finalizar sera gerado um csv na area de trabalho

## Exemplo 2
Para inicio do projeto, criar um diretorio para o mesmo e dentro criar dele digitar ```yarn init```.

Criar um arquivo **index.js**

Instalar as dependencias
```js
yarn add axios cheerio
```

O conteudo do index.js será este
```js
const axios = require('axios');
const cheerio = require('cheerio');   // Igual ao Jquery, só que para nodejs

const url = 'https://algumsite.com.br';

axios.get(url)
  .then(response => {
    let getData = html => {
      data = [];
      const $ = cheerio.load(html);
      $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
        data.push({
          title : $(elem).text(),
          link : $(elem).find('a.storylink').attr('href')
        });
      });
      console.log(data);
    }
    
    getData(response.data)
  })
  .catch(error => {
    console.log(error)
  })
```

No package.json incluir um script que rode o comando ```yarn index.js```.