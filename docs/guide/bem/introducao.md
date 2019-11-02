# Introdução

A sigla **BEM** significa __block__, __element__, __modifier__ onde segue essas propriedades para definir uma nova metodologia de criação de nomes para classes em folhas de estilo.

- **bloco** => pode-se dizer que seria relativo a um componente.
- **elemento** => parte(s) que forma(m) um bloco;
- **modificador** => estado de um dos dois itens anteriores.

A estrutura é bem simples:

- .elementopai,
- .elementopai__filho,
- .elementopai__filho- -primeiro


```js
.formconteudo (elemento pai)
.formconteudo__field (elemento filho)
.formconteudo__field--first (elemento filho modificado)
```

```html
<form class="formconteudo">
  <input type="text" class="formconteudo__field--first" />
  <input type="text" class="formconteudo__field" />
  <input type="submit" class="formconteudo__field--button" />
</form>
```

Com esta outra estrutura:

```html
<ul class="list">
  <li class="list-item active"></li>
  <li class="list-item"></li>
  <li class="list-item"></li>
</ul>
```

Teriamos
```html
<ul class="list">
  <li class="list__item"></li>
  <li class="list__item"></li>
  <li class="list__item list__item--active"></li>
</ul>
```