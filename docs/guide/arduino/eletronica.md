# Eletronica
> Desde já informo que nao sou nenhum especialista em eletronica, mas conheço algumas coisas por pesquisar sobre o assunto. E são as minhas pesquisas que estao neste topico.
>
> Caso encontre alguma coisa que esteja errado pode me informar que estou aberto para correcoes.

## Dimensionar Bateria
Calculo para saber quanto tempo dura uma bateria alimentando um projeto.

_Exemplo 1_

Umas das formas é ver nas especificacoes da bateria.

Um Projeto X que é alimentado por uma bateria de 5v.

Alimentando em uma bateria de 6v e 12Ah (Ampeer Hora de fornecimento de corrente), usando um amperimentro no fio vermelho de fornecimento de energia podemos saber qual o consume de corrente no projeto.

Digamos que este projeto consome 150mA (0.15A).

Olhando na documentacao da bateria podemos procurar pela tabela de descarga em corrente constante.

Muitas baterias mostram o tempo de duracao dela.

Uma da KMA Brasil por exemplo com as mesmas caracteristicas do exemplo mostram o seguinte:

[Exemplo bateria](/bateriaexemplo.png)

Se tivermos uma bateria descarregando e com carga de 5.55v e no nosso projeto tivermos um consumo de 32A a bateria dura 5 minutos.

Para o exemplo de consumo de 150mA (0.15A), nosso projeto pode durar entre 1 - 2 dias com a bateria de exemplo.

_Exemplo 2_

Outra forma de verificar quanto tempo vai durar a bateria no projeto é da seguinte forma.

Digamos que temos uma pilha de 12v com capacidade de 100mAH e queremos que nosso sistema fique ligado por 1 hora.

Para isso precisamos saber o consumo do nosso sistema, digamos que vimos o consumo e esta com 100mA certinho, logo o nosso sistema ficara ligado por 1 hora.

Quanto menos consumo tivermos no nosso sistema para a mesma bateria ainda, mais tempo vai durar ele ligado.

Se o consumo do nosso sistema for de 50mA, ficara ligado nesta bateria por 2 horas.

Agora se o sistema tiver 200mA de consumo ficara ligado por meia hora nesta bateria.

Podemos saber o consumo do nosso sistema por meio do multimetro.

Alimentando o sistema na bateria, pegue o multimetro e configure os pinos para COM e VΩmA (ou VmAΩ) e na escala de amperimetro com a faixa que vc precisa.

Interrompe o sistema no fio posssitivo ficando o fio possitivo partido com uma parte no sistema e outra na fonte

Pegue o cabo que esta ligado no COM (preto) do multimetro e ligue na metade do fio que ficou no sistema

Pegue o cabo que esta ligado no VΩmA (vermelho) do multimetro e ligue na metade do fio que ficou na bateria

Agora vamos ter quanto amperes o nosso sistema esta consumindo

[Amperes Sistema](/amperessistema.png)

Agora basta fazer o calculo para saber quanto tempo dura.

Digamos que temos um sistema de 52mA e uma bateria de 12v e 1AH.

```js
1x1000=1000 mA
0,952x1000=52 mA
1000 mAh / 52 mAh = 19,23... Horas

1/0,052=19,23 (resumido)
```

Logo para o exemplo temos uma bataria de 12v e 1AH que vai durar 19horas em um sistema que consome 52mA.

Para calcular a potencia:

```js
// Pilha de 12v
// mA sistema 52mA
P = Ventrada * mASistema
P = 12 * 0,052
P = 624mW (miliwatts)
```

## LED
Existe led alto brilho que nao é pintado e difuso que é pintado.

Para calcular o resistor para o LED podemos usar a seguinte formula:

```js
R = (Ve - Vl) / il
```

- R: Resistor
- Ve: Tensão de entrada
- Vl: Tensão do Led
- il: Corrente Led (Ampers)

**Exemplo**

Para uma tensao de entrada de 5v e um LED X que trabalha com tensao de entrada de 2v e 20mA.

A formula é ```R = Ventrada - Vled / Aled```

```js
R = (5 - 2) / 0.02
R = 3 / 0.02 = 150 Ohms
```

Caso nao encontre o resistor com 150 Ohms, pode ser usado um com OMHS um pouco maior ou um pouco menor se nao tiver um maior.

Lidagos em serie a corrente é a mesma, mas a tensao muda. A tensao é somada para fazer o calculo.

**Exemplo**

Para uma tensao de entrada de 5v e dois LEDs X que trabalha com tensao de entrada de 2v e 20mA cada.

A formula é ```R = Ventrada - (Vled1 + Vled2 + ...) / Aled```

```js
R = (5 - (2+2)) / 0.02
R = (5 - 4) / 0.02
R = 1 / 0.02 = 50 Ohms
```


Lidagos em paralelo a tensao é a mesma para todos os leds e a corrente só a mesma se a resistencia das cargas forem iguais.

**Exemplo**

Para uma tensao de entrada de 5v e dois LEDs X que trabalha com tensao de entrada de 2v e 20mA cada.

A formula é ```R = Ventrada - (Vleds) / (Aled1 + Aled2 + ...)```

```js
R = 5 - 2 / (0.02 + 0.02)
R = 5 - 2 / 0.04
R = 3 / 0.04 = 75 Ohms
```



Vale lembrar que é bom olhar a potencia tambem, pois se a tensao da fonte for muito alta o resistor precisa mandar embora o calor.

Quanto maior for a potência em watts do resistor maior a sua capacidade de dissipação de calor.

A corrente que circula por ele ja que esta em serie com o led é a mesma do led, se atentar a isso.

O resistores são vendidos em potencias de 1/16 (0,06), 1/8 (0,12), 1/4 (0,25), 1/2 (0,50), 1w, 2w, 3w, ... assim por diante

A formula é ```P = (Ventrada - (Vled1))ˆ2 / R```

Para calcular a potencia para um led ```P = (Ventrada - (Vled1))ˆ2 / R```:
```js
R = (5 - 2) / 0.02
R = 3 / 0.02 = 150 Ohms

P = (5 - 2)ˆ2 / 150
P = 3ˆ2 / 150 = 0.06W (watts)
```

Um resistor de 1/16 estaria otimo mas encontramos com mais facilidade de 1/8 e 1/4, já que o 1/4 dissipa mais podemos escolher ele.


Para calcular a potencia para leds em serie ```P = (Ventrada - (Vled1 + Vled2 + ...))ˆ2 / R```:
```js
R = (5 - (2+2)) / 0.02
R = (5 - 4) / 0.02
R = 1 / 0.02 = 50 Ohms

P = (5 - (2+2))ˆ2 / 50
P = (5 - 4)ˆ2 / 50
P = (5 - 4)ˆ2 / 50
P = 1ˆ2 / 50 = 0.02W (watts)
```

Para calcular a potencia para leds em paralelo ```P = (Ventrada - Vleds)ˆ2 / R```:

A formula é ```R = Ventrada - (Vleds) / (Aled1 + Aled2 + ...)```

```js
R = 5 - 2 / (0.02 + 0.02)
R = 5 - 2 / 0.04
R = 3 / 0.04 = 75 Ohms

P = (5 - 2)ˆ2 / 75
P = 3ˆ2 / 75 = 0.12W (watts)
```



## Capacitor
A Capacitância media em Farad (F) representa a quantidade de carga que o Capacitor é capaz de armazenar.

A Tensão representa a quantidade ideal/maxima de tensão para que o capacitor desempenhe sua função no circuito sem complicações ou riscos ao processo. É expressado em volts (V) ou quilovolts (kV).
