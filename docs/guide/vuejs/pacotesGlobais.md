# Pacotes Globais

Para usar um pacote globalmente na aplicacao podemos fazer assim (Exemplo com o moment.js):

main.js
```js
import moment from 'moment';

Object.defineProperty(Vue.prototype, '$moment', { value: moment });
```

App.js
```js
export default {
  created() {
    console.log('The time is ' . this.$moment().format("HH:mm"));
  }
}
```

Desta maneira temos o pacote como apenas leitura, nos ajudando evitar fazer isso
```js
this.$http = 'Modificando';

// TypeError: this.$http.get is not a function
this.$http.get('/');
```