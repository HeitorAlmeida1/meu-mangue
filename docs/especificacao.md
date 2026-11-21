# Titulo do documento

## 1. Contexto

Descreva o cenário atual, o problema identificado e a necessidade de desenvolver o sistema.


A principal questão a ser tratada é a presença no sistema de nomes iguais ou variações (exemplo), dificultando a determinação espécies e tomada de decisão com base nos dados existentes na base de dados da aplicação. Algumas espécies, ainda, estão sendo associadas a aquários com tipo de água inadequados para sua sobrevivência e, por fim, dificuldades na visualização de algumas métricas relacionadas aos espécimes (tipo de água, tamanho).

Essas problemáticas, somadas, causam impactos notáveis no faturamento e na balança comercial da empresa, gerando perdas imprevistas por motivos plenamente evitáveis e inviabilizando a análise dos dados coletados e a gestão dos sistemas de aquários cadastrados. Para solucionar isso, há a necessidade de desenvolvimento de um sistema que resolva essa situação, o que será descrito abaixo.

## 2. Objetivo

Descreva a finalidade do sistema e o resultado que se pretende alcançar com seu desenvolvimento.


O sistema já existente da aplicação AquaTech terá seu controle centralizado, sendo que já possuímos o cadastro de empresas, usuários, aquários pertencentes às empresas clientes e um painel de gestão; a solução propõe melhorar a forma como esse sistema possibilita aos nossos clientes gerir de forma mais aprofundada seus aquários, adicionando a função de cadastro de espécies, associadas a aquários apropriados para si, e que terão suas informações continuamente atualizadas.
Dentro desta aplicação, haveria duas formas de restringir o cadastro de espécies de forma a não haver repetição de nomes nem a alocação de espécies em aquários inadequados para essas: a limitação a partir de novas propriedades das entidades representantes de aquário e espécie no banco de dados e a necessidade de aprovação por um supervisor da área ao realizar operações como alocação e registro de espécies.


## 3. Escopo

Delimite o que será desenvolvido nesta versão.

- **Dentro do escopo:** funcionalidades e recursos que serão implementados.

Uma nova funcionalidade para registro de espécies de peixe, a revisão da modelagem de aquários e de usuários para se adequar às formas de delimitação descritas acima, além de uma atualização na dashboard com base nesses novos campos e novas tabelas do sistema.

- **Fora do escopo:** funcionalidades e recursos que não serão contemplados.

As demais funcionalidades, como cadastro de empresa, não serão afetadas por essa revisão no modelo de negócio do cliente.

## 4. Funcionalidades

Liste e descreva as operações que o usuário poderá realizar no sistema.

A depender do status do usuário, sendo ele mais básico ou tendo maior relevância dentro da empresa, o usuário poderá criar aquários, registrar espécies, manipular esses dados inseridos (atualizando, apagando ou adicionando eles).

## 5. Regras de negócio

Descreva as condições e restrições que determinam o funcionamento do sistema.

Considere campos obrigatórios, validações, dados duplicados e restrições para edição e exclusão.


campos obrigatórios novos: tipoUsuario na tabela de usuário, para fazer a divisão de atribuições dentro do sistema e garantir maior segurança na inserção final de dados no mesmo. tipoAgua na tabela de aquário, para garantir que o usuário saiba onde alocar o espécime com que se lida de forma proveitosa.

Dados duplicados: validação utilizando de função "verNomeEspecie" na model do projeto, chamando no Banco um select para ver e já há incidências de um dado nome.

Nova tabela: espécie.

## 6. Interface

Descreva como o sistema será apresentado e como o usuário deverá interagir com ele.
Considere organização das telas, formulários, botões, filtros, mensagens e identidade visual.


Seguiremos o padrão do restante da aplicação quanto ao padrão visual e design na implementação dessas novas funcionalidades sistema.

## 7. Critérios de aceitação

Defina condições objetivas para verificar se as funcionalidades foram implementadas corretamente.

- Testar o cadastro de uma mesma espécie para verificar se as restrições de somente uma espécie com dado nome e da revisão e aceite por parte de supervisor estão funcionando

- É necessário que a IA integrada leia o documento de especificação relativo à funcionalidade desenvolvida e registre num documento de implementação o que foi feito, como o processo foi realizado.

- O padrão de atuação da IA integrada deve seguir o que está descrito no arquivo AGENTS.md