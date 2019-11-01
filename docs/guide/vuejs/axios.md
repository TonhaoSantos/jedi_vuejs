# Axios
A melhor for que encontrei para usar o axios é criando um arquivo separado para concentrar todas as consultas, desta forma consigo compartilhar ela com toda a aplicação, ficando mais facil reutilizar um mesmo código em diversos lugares.

Seguindo a estrutura que defino na sessão **Instalção > Estrutura de projetos**, declaro as consultas dentro do arquivos **searches > index.js**.

```js
import axios from "axios"

export function getUsuarios() {
  let url = 'http://algumacoisa.com.br/usuarios'

  return axios.get(url)
    .then(response => {
      return response
    })
    .catch(e => {
      console.log(e)
    })
    .finally(f => {
    })
}

export function updateUsuario(id) {
  let url = `http://algumacoisa.com.br/usuarios/${id}`

  return axios.put(url)
    .then(response => {
      return response
    })
    .catch(e => {
      console.log(e)
    })
    .finally(f => {
    })
}
```

Agora em algum componente qualquer basta importar o arquivo:
```html
<template>
  <div>
  </div>
</template>

<script>
import { getUsuarios } from '@/searches';

export default {
  name: 'Pai',
  data () {
    return {
    }
  },
  methods: {
    async obterUsuarios () {
      let usuarios = await getUsuarios()
    }
  }
}
</script>
```
Costumo usar **async/await** onde chamo as funções pois pode demorar e para não dar alguma inconsistência.