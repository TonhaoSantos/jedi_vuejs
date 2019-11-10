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

// Atualizar url do remote localmente
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git

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
git diff -- caminhoenomedoarquivo branch1..branch2          //diferença de arquivos especificos entre branchs
git diff branch1..branch2          //diferença entre branchs
git log --online                  //Log dos commits feitos em uma linha
git log                           //Log dos commits feitos completo
git checkout numeroCommit^ -- arquivo           //Voltar arquivo conforme alguma branch
git commit --amend                          //Alterar Titulo e texto do ultimo commit localmente
git push --force origin NomedoBranch        //Forçar o envio do commit com -amend
git checkout --track -b NomedoBranch origin/NomedoBranch          //Baixar branch remota localmente
git show    // Ver a ultima coisa que foi feita no commit mais recente
git show identificacao    // Mostrar alteracao especifica, pegando uma parte ou toda a identificacao de um commit obtido pelo git log
git show v0.1    // Mostrar alteracao especifica de uma tag especifica
git tags      // Ver as tags locais
git tag v0.1   //  Gravar tag sem informar nada nela
git tag -a v0.1  // -a para gravar dados, pega o commit atual. Ele pergunta se quer deixar um comentario ou nao igual qno commit
git tag -a v0.1 identificacao  // -a para gravar dados, commit especifico identificado pelo git log
git tag -d v1.0 && git push --delete origin v1.0     // Excluir uma tag especifica local e remota
git tag -a v0.1 -m "Mensagem"   // Passando uma mensagem
git push origin --tags   // Enviar todas as tags
git push origin v1.0  // Enviar tag especifica

// Remove arquivo da branch remota
git rm --cached nomeArquivo
git rm --cached -r nomeArquivo
git commit -m "Mensagem"
git push origin nomedabranchremota
```