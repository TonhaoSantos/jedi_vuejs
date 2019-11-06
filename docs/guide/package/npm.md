# Publicacao

Para publicar no npm é preciso ter uma conta, apos ter criado seguir os passos.

Com o projeto já publicado no **Github** no terminal do projeto logue no npm:

```js
npm login
```

Será solicitado **usuario**, **email** e **senha**.

## Projeto pessoal
Agora que já esta logado basta digitar no terminal:

```js
npm publish
```

## Projeto Organizacao
Se for para uma organizacao o package tem que ser criado assim:
```js
npm init --scope=nomeOrganizacaoCriadaNoNpm
```

Por padrao qualquer pacote publicado como organizacao é privado e para publicar é o mesmo comando:
```js
npm publish
```

Para publicar um pacote d organizacao publico
```js
npm publish --access public
```

Sempre que atualizar o projeto não esquecer de atualizar a versão no **package.json**, commitar as mudancas no **git**, publicar no **git**, criar e publicar a tag no **git**, e publicar no **npm**.

Desta forma o projeto fica bem organizado e configurado, sem contar que ele fica atualizado em todos os locais.