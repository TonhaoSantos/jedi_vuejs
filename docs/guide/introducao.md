# Introdução

## O que é o vue.js
É um Framework progressivo que nos permite desenvolver interfaces de comunicação com o usuário.

Traduzindo, criar telas de uma forma mais moderna.

Ele tem o objetivo de ser incrementável ou montável, no estilo **Minecraft** ou **Lego**.

Ou seja, divide-se em diversas peças que podem ser facilmente encaixadas umas nas outras.

Logo passamos a ter o importante papel de juntar estas *"peças"* de uma forma coerente para que seu resultado seja conforme esperado, onde tomando como exemplo temos um parafuso como esperado e se sairmos juntando de qualquer forma o resultado é um alfinete.


## Como se fala?
A forma certa de se falar é view e não vuee e afins.

Se fala igual visão em **inglês** "*view*"


## História
>*Esta história foi garimpada de vários lugares ao longo da minha caminhada com Vue.js.*
>*Não garanto 100% de sua veracidade.*

Desenvolvida pelo nosso querido japa Ex *[Googler](https://www.google.com.br "Buscador")* e Ex *[Anguler](https://angular.io/ "Framework Front-End")* *[Évan You](https://twitter.com/youyuxi "Twitter")* em **JavaScript**.

Depois de trabalhar com **Angular** em vários projetos para a **Google** ele pensou:

>*I figured, what if I could just extract the part that I really liked about Angular and build something really lightweight.*
>
>*Eu imaginei, e se eu pudesse extrair a parte que eu realmente gostei sobre o Angular e construir algo realmente leve* - **Tradução literal**

O Vue.js foi lançado originalmente em fevereiro de 2014.

Mesmo sendo mantida apenas por seu criador e uma comunidade não muito grande, ela se equipara aos poderosos **Angula** (do Google) e **React** (do Facebook).

Na minha opnião ___(minha opnião)___ é melhor que qualquer uma destas duas por diversos fatores, dentre eles:

- Curva de aprendizado muito menor;
- Ser leve, vindo apenas com seu núcleo, com o restante sendo adicionado apenas quando surgir a necessidade
- E ter uma performance superior aos demais

Apesar de não ter uma empresa grande por trás, a manutenção do projeto é muito grande.

A cada dia surgem novas extensões e melhorias, deixando uma pessoa apaixonada por novas tecnologias **(eu)** completamente saciada de conhecimento.

O crescimento do framework começou quando grandes empresas, como [Alibaba](https://www.alibaba.com) e [Baidu](https://www.baidu.com), começaram a usá-lo em diversos projetos de lojas virtuais e sites corporativos.

Elas também ajudaram fazendo doações e um acordo para que Evan dedicasse todo o seu tempo ao projeto, recebendo um salário variante, maior que 7 mil dólares, pago por esses investidores, pela comunidade Vue.js e outros.

Mas sua popularidade no desenvolvimento web só deu um salto quando [Taylor Otwell](https://twitter.com/taylorotwell), o criador do [Laravel](https://laravel.com "Framework mais popular para PHP"), exaltou a criação do japa em uma postagem no Twitter:

>*[Current React learning status: overwhelmed. Learning @vuejs because it looks easy and has pretty website](https://twitter.com/taylorotwell/status/590281695581982720).*
>
>*Status atual de aprendizado de React: sobrecarregado. Aprendendo @vuejs porque parece fácil e tem site bonito.* - **Tradução literal**

Então se ele está falando que é fácil vamos aprender, ainda mais que o site dele é ___bonito___.

Depois disso, o crescimento foi instantâneo.

Usuários do **Laravel** começaram a integrar suas aplicações com o **Vue**, o que deixou claro ser uma opção perfeita, pois ambos ___(Laravel e Vue)___ possuem uma sintaxe de código bem elegante.

Recomendações não faltam, mas em resumo, se você não quer ter de aprender quase tudo de desenvolvimento front-end para usar um framework front, então o **Vue** é o que você deseja!

O Vue nos dá total liberdade de usá-lo como bem entendermos, logo você não ficará sobrecarregado ___(como Otwell)___, pois tudo funciona aqui, e funciona com elegância!

Essa é a principal vantagem dessa biblioteca.

Por que não fazer mais com menos?

É essa a proposta, e é por isso que qualquer um deve utilizar o Vue.


## Ambiente
Antes de tudo é preciso ter um ambiente com ferramentas que dão a maior **produtividade** possível e configurações que permitam testar códigos com **agilidade**.

Ela também deve ser livre de **travamentos** e telas com carregamento demorado.

A melhor alternativa para se trabalhar com Vue assim como todas as ferramentas JavaScript é usando o *[Node.js](https://nodejs.org)* e o *[NPM](https://www.npmjs.com/ "Gerenciador de Pacotes")* ou *[Yarn](https://yarnpkg.com)* pelo fato de termos em um projeto uma grande quantidade de código de terceiros, e podermos gerenciá-las com o *NPM* ou *Yarn*.

Logo não vamos precisar baixar e importar cada biblioteca nova manualmente afetando a nossa produtividade.

Existe uma outra opção para trabalhar com *Vue* que é usando o *CDN oficial* dele ou baixando o arquivo minificado e importando-o no *HTML*.

Pode parecer simples mas não é.

E pode dar um pouco mais de trabalho pois as dependências seriam importadas manualmente e também teríamos uma perda considerável de desempenho dado que o *Vue* com *Node.js* gera um código minificado mais leve para ser usado em ambiente de produção.

Recomendo esta opção se você vai usar o *vue* em lugares aleatórios na sua aplicação não sendo uma aplicação **Full-Vue**.


## Arsenal
Na minha opnião para se trabalhar com o Vue.js é obrigatório o seguinte arsenal de batalha.

- *Terminal*
- *Node.js*
- *NPM* ou *Yarn* (**Opcional**, recomendo ela por ser mais rapida e possuir cache de instalação)
- *IDE* (uma **Top** - Aquela que te dá um ganho de agilidade no desenvolvimento)
- *Extensões de navegadores* que servem para completar o ambiente de desenvolvimento.

O **Vue** e a sua comunidade disponibilizam algumas extensões que dão um feedback gráfico do código de sua aplicação.

Elas são ideais para desenvolvedores **debugarem** o código e verem a estrutura e as mudanças que estão sendo apresentadas na tela naquele momento.

Um é o **Vue Devtools** e o outro o **DejaVue**, que ao ser instalados ficam disponíveis nas ferramentas do desenvolvedor no navegador. Possuem objetivos parecidos, porém, dão um suporte de grande qualidade quando usados juntos.

Eu uso eles no ___[Firefox](https://www.mozilla.org/pt-BR/firefox/new "Navegador Firefox")___ e no ___[Chrome](https://www.google.com/chrome "Navegador Chrome")___ .


## Reatividade
É um dos aspectos mais importantes do Vue.

De uma forma clara.

Quando uma **variável** é alterada, instantaneamente a **reatividade** trata de informar a modificação para todos	os observadores de elementos que a usam.

Assim, eles são **renderizados** novamente na tela, fazendo o usuário ver essas modificações em **tempo real**.

Sem fazer o recarregamento da página.

Essa funcionalidade é da natureza do Vue, não nos possibilitando de **desabilita-la**.

A reatividade tornam as nossas páginas mais **interativas** e **bonitas**.


## Fluxo de funcionamento
A fluxo de funcionamento do Vue.js mais correto é este:

![An image](/FluxoVuejs.png)
***Fonte**: Front-End Com Vuejs da Teoria a Prática Sem Complicações - Casa Do Código*

Podemos ver um arquivo principal que solicita um bloco inicial e se encarrega de exibir os blocos que compõem a aplicação.

Acessando o site fictício passaremos por dois arquivos:	

- **main.js**: onde temos o código que inicia a aplicação
- **App.vue**: nosso layout (componente principal), no qual chamamos os demais blocos, sejam eles A ou B.

Seguindo o App.vue temos uma árvore de blocos, podemos observar que o site fica mais organizado.

Olhando no **browser** o resultado é o bloco representado	polo App.vue, onde temos os outros blocos que juntos constituem a interface do site.

Veja que A é o cabeçalho, ...

O reúso pode ser muito alto já que cada elemento está separado em blocos e cada bloco tem seu bloco filho, ...