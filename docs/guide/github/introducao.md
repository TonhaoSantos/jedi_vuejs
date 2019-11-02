# GIT
Comandos mais usados por mim

```js
// Ajuda
git help
git help NomeComandoQueSeQuerAjuda


// Configuração
git config --list
git config --global user.name "SeuNome"
git config --global user.email "SeuEmail"


// Configurando alias para os comandos
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status


// Iniciando um projeto com GIT
git init
git clone git://github.com/schacon/Projeto.git
git clone git://github.com/schacon/Projeto.git NomeDoDiretorioEspecifico


// Juntando varios comandos com duplo &&
git add . && git commmit -m "alguma coisa"


git status      // Status do repositorio
git branch         // Ver branchs locais
git branch -a     // Ver branchs remotas
git pull origin nomedobranch        //Baixar
git checkout NomedoBranch            //Ir para branch
git checkout -b nomedobranch          //Criar Branch e ir para ela
git add .      // Adicionar alteracoes
git commit -m "description / observation"    // Commitar alteracoes
git push origin nomedobranch        // Enviar
git merge nomedobranch      // Mergiar branchs
git checkout -- caminho\nomedoarquivo.ext          //Desfazer alterações de um arquivo
git checkout -b nomedabranchlocal origin/nomedabranchremota          //Baixar uma branch remota e cria-la localmente
git push origin nomedobranch_local:nomedobranch_remoto          //Enviar as mudanças para o repositório remoto quando o branch local e remoto são diferentes
git add -u          //Remover arquivos que foram deletados
git push origin :nomedobranch          //Apagar um branch no repositório remoto
git branch -d nomedobranch          //Apagar uma branch local
git branch -D nome do branch          //Forçar deletar um branch local
git merge --abort          //Ignorar branch
git clean -d -x -f          //zerar alterações da branch
git reset --hard origin/master          //reinicia a master para origin/master
git diff -- caminhoenomedoarquivo branch1..branch2          //diferença de arquivos entre branchs
git log --online                  //Log dos commits feitos em uma linha
git log                           //Log dos commits feitos completo
git checkout numeroCommit^ -- arquivo           //Voltar arquivo conforme alguma branch
git commit --amend                          //Alterar Titulo e texto do ultimo commit localmente
git push --force origin NomedoBranch        //Forçar o envio do commit com -amend
git checkout --track -b NomedoBranch origin/NomedoBranch          //Baixar branch remota localmente
```