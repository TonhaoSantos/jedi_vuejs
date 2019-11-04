# Introducao

Uma versão semântica tem três números.

**versãoPrincipal**._versãoSecundária_.__versãoPatch__


## Versão principal.
Informa às pessoas que há alterações incompatíveis com versões anteriores.

As pessoas podem sofrer rupturas se usarem a próxima versão.

Ao aumentar o número da versão principal, você redefine a versão do patch e as versões secundárias.


## Versão secundária

Usado quando você libera novas funcionalidades no seu projeto.

Quando você aumenta a versão secundária, também aumenta em uma. Mas quando você aumenta a versão secundária, deve redefinir a versão do patch para zero.

## Versões de patch
Usado para correções de bugs. Não há alterações de funcionalidade. (É por isso que usamos uma versão de patch quando lançamos um hotfix na lição anterior ).

Ao aumentar um novo patch, você aumenta o número à direita em 1. A partir de 1, você aumenta para 2, depois para 3 e assim por diante.

Se o número do seu patch for 9, quando você aumentar a versão do patch novamente, você aumentará para 10, 11 e 12, e assim por diante. (Não há limites para os números)



## Pré-lançamentos
Versão alfa ou beta adicionamos um -, seguido pelas palavras **alpha** ou **beta**.

Para versionar o alpha e o beta incluimos um número na frente da palavra:

alpha1, alpha50, ....

## Projeto Novo
Eu costumo sempre começar um projeto com 0.1.0, tirei como base projetos que já participei.

Quando estou pronto para lançar  ao público aumento a versão para 1.0.0.