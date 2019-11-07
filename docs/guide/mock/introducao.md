# Introducao

Para mocar uma **API** eu costumo fazer assim:

Baixar este pacote globalmente
```js
npm install -g json-server
```

Para uma boa organizacao, criar em algum lugar do computador um repositorio onde vai ficar alocado o banco mocado.

Por exempo na **Area de Trabalho > DBMock**.

E dentro dele um arquivo com o nome **db.json** e um objeto como este por exemplo:

```json
  "usuario": [
    {
      "id": 1,
      "nome": "Fulano X"
    }
  ],
  "perfil": [
    {
      "id": 1,
      "nome": "Adm"
    }
  ]
}
```

Para poder rodar o mock aponte para o diretorio dele e rode:
```js
json-server --port 3004 --watch db.json
```

Vai ser disponibilizado um servidor no endereco ```localhost:3000``` com os seguintes metodos GET, POST, PUT, PATCH e DELETE. você vai poder usar como se fosse uma API real (Para teste apenas).

## Filtros
Aceita filtros:
GET http://localhost:3000/usuarios?nome=Fulano

## Paginacao
Aceita paginacao:
GET http://localhost:3000/usuarios/?_page=1&amp;_limit=2

## Ordenacao
Aceita ordenacao:
GET http://localhost:3000/usuarios?_sort=nome&amp;_order=desc