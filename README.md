<p align="center">
  <img width="200" height="200" src="https://raw.githubusercontent.com/kaiomoreira-dev/culinary-recipe/main/readme-img/cullinary-recipe-img.png">
</p>

![Badge api-version v1.0](https://img.shields.io/badge/api--version-v1.0-blue)
![Badge coverage 100%](https://img.shields.io/badge/coverage-100%25-green)
![Badge swager document](https://img.shields.io/badge/swagger-document-green)

## Summary
- [Intro](#intro)
- [Description](#description)
- [Pré-requisitos](#pré-requisitos)
- [Diagrama de Classe UML](#diagrama-de-classe-uml)
- [Coverage Jest](#coverage-jest)
- [Project Features](#project-features)
- [Email](#email)
- [Author](#author)
- [Recipe](#recipe)
- [Ingredient](#ingredient)
- [Product](#product)
- [API production configuration](#api-production-configuration)
- [Acesso ao projeto](#project-access)
- [Open && Run](#open-and-run)
- [Next Releases](#next-releases)
- [Techniques && Technologies](#techniques--technologies)
- [Owner](#owner)

## Intro
* Esse API tem como objetivo demonstrar habilidades acadêmicas e práticas desenvolvidas através do projeto pessoal culinary-recipe. As habilidades foram desenvolvida de forma totalmente independente, afim de gregar reconhecimento profissional e valores ao portifólio.

## Description
* Essa é uma REST API que tem como objetivo realizar operações CRUD no sistema de Receita Culinária. A Receita poderá conter diversos Ingredients como partes que depende de um Produto. E um Author como reponsável que contém diversos e-mails de contato.

## Pré-requisitos
* Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/). 
E o banco de dados Postgres:
[Postgres](https://www.postgresql.org/).
E o docker para utilizar docker-compose para subir o container do Postgres
[Docker](https://https://www.docker.com/).
E instalar o docker-compose pra subir o container.
[Docker-Compose](https://docs.docker.com/compose/install/).
Além disto é bom ter um editor para trabalhar com o código como 
[VSCode](https://code.visualstudio.com/).

## Diagrama de Classe UML
![mer-culinary-recipe](readme-img/diagram-culinary-recipe.png)

## Coverage Jest
![coverage-jest](readme-img/coverage-jest.png)

## Project Features

## Email
**Requisito Funcional**
* Deve ser possivel cadastrar um email.  
* Deve ser possivel buscar todos emails.
* Deve ser possivel buscar email por id.
* Deve ser possivel atualizar email por id.
* Deve ser possivel deletar email por id.  

**Regra de Negócio**
* Nao deve ser possivel cadastrar um email com mesmo email.
* Não deve ser possivel cadastrar email com author invalido.
* Não deve ser possivel buscar email com id invalido.
* Não deve ser possivel atualizar email com id invalido
* Não deve ser possivel deletar email com id invalido.

## Author
**Requisito Funcional**
* Deve ser possivel cadastrar um author.
* Deve ser possivel buscar todos authors.
* Deve ser possivel buscar author por id.
* Deve ser possivel atualizar author por id.
* Deve ser possivel deletar author por id.

**Regra de Negócio**
* Não deve ser possivel criar um author com o mesmo nome. 
* Não deve ser possivel criar um author com o mesmo whatsapp.
* Não deve ser possivel buscar um author com id invalido.
* Não deve ser possivel atualizar um author com id invalido.
* Não deve ser possivel deletar um author com id invalido.

## Recipe
**Requisito Funcional**
* Deve ser possivel cadastrar uma recipe.
* Deve ser possivel buscar todas as recipes existentes.
* Deve ser possivel buscar todas as recipes pelo ingredient_id.
* Deve ser possivel deletar uma recipe por id.

**Regra de Negócio**
* Não deve ser possivel criar uma recipe com difficulty diferente de easy, medium e hard.
* Não deve ser possivel criar uma recipe com dish_type diferente de appetizer, main course e dessert.
* Não deve ser possivel criar uma recipe com author_id invalido.
* Não deve ser possivel criar uma recipe com ingredient_id invalido.
* Não deve ser possivel criar uma recipe com menos de 2 ingredients.
* Não deve ser possivel buscar uma recipe com ingredient_id invalido.
* Não deve ser possivel deletar uma recipe com id invalido.

## Ingredient
**Requisito Funcional**
* Deve deve ser possivel cadastrar um ingredient.
* Deve ser possivel buscar todos os ingredients existentes.
* Deve ser possivel buscar um ingredient por produto_id.

**Regra de Negócio**
* Não deve ser possive criar um ingredient com produto_id invalido.
* Não deve ser possivel criar o mesmo ingredient com unity e weight existentes.

## Product
**Requisito Funcional**
* Deve ser possivel cadastrar um produto.
* Deve ser possivel listar todos os produtos existentes.
* Deve ser possivel atualizar um produto por id.

**Regra de Negócio**
* Não deve ser possivel cadastrar um produto com o mesmo nome.
* Não deve ser possivel atualizar um produto com id invalido.

## API production configuration
* EC2 - Instancia criada na AWS com uma maquina virtual contendo Ubuntu 20.04 LTS
SSD volume types 64bits x86. Com uma chave .pem configurada usamos para conectar na instancia.
Para uma conexão mais segura com a instancia criamos grupo de usuarios com permissoes de admin.
Um arquivo authorized_keys na pasta .ssh com a chave ssh-keygen conectando a maquina local e a instancia através da chaves. Com a instancia configurada usaremos o ip<publico> da instancia para conectar. Em seguida instalar todos os programas como docker, docker-compose, nodejs e yarn para
funcionamento da api.

* Babel - Configurar o babel na api local instalando libs para compilar API em typescript para javascript de forma mais perfomática e rápida.
![babel-config-img](readme-img/babel-config.png)


* Git/Github - Através do git init criamos um repo local e salvamos toda nossa aplicação gitando cada parte. Em seguida criamos um repositorio no github para salvarmos nossa api, com o intuito de criar o processo de CI/CD da api. Então criamos um chave ssh-key.pub local no github para commitarmos e visitar api de forma mais acessível e segura. Também vamos criar uma chave ssh key para a instancia EC2 da api. 
  
* Clone API - Clonaremos a API na instancia EC2 depois de carregada no repositorio do github e instalaremos todas as bibliotecas da aplicação usando o comando yarn.

* Container Postgress - Alteramos a configurações do serviço do docker-compose container do banco de dados do Postgres criptografando a senha e removendo a porta padrão de conexão 5432:5432.

* GitActions CI/CD - Para configurarmos o processo de CI/CD criaremos uma chave ssh-key.pub local com o nome de gitactions. Pegaremos a chave e colocaremos no arquivo authorized_keys dentro da instancia EC2. Em seguida vamos em nossa api no culinary-recipe no github e criaremos os secrets da api. Criaremos o secres SSH_HOST com ip publico da instancia EC2, SSH_KEY com chave ssh-privada de gitachtions, SSH_USER com o nome user criado na instancia EC2 'app' e SSH_PORT com a port da instancia EC2. Em seguida criaremos e configuruaremos nossa git actions. Para rodar na ultima versão do ubuntu, instalar nodejs, criar os push na main, instalar todas as dependencias da API, criar o build, subir os container dos bancos, rodar todas as mirgations, rodar os tests, configurar host,key,user e port com os secrets. E por fim atualizar novamente todos os pacotes, rodar as migrations mais uma vez e rodar a api com o pm2.
![gitaction-img](readme-img/gitaction.png)

* Proxy Reverso - Primeiro vamos instanlar o servidor HTTP nginx para o proxy reverso. Em seguida vamos até a instancia adicionar regras de entrada no grupo de segurança da instancia. Adicionamos as regras HTTP/HTTPS com ips personalizados 0.0.0.0/0. Por fim na instancia vamos até a pasta do nginx em site-available criaremos um arquivo culinary-recipe com as configurações do server e location. Por fim criaremos um link simbolico em da pasta site-enable para pasta site-available dentro do nginx.
![nginx-img](readme-img/nginx.png)

  
* Gerenciado de processo - Instalamos o pm2 para gerenciar os processo do runtine da aplicação. Assim podemos iniciar, restart, parar, monitorar o status, memoria e CPU em produção da API.
![pm2-img](readme-img/pm2.png)

* Domínio SSL - Através de um dominio existente entraremos na AWS Route53 e criaremos um nome com o dominio existente. E enviaremos para o dominio o ip publico da instancia para validar o nome do subdominio criado para api. Em whatsmydns.com procuramos pelo o subdominio criado em Route53 para ve se propagou. Em seguida vamos até o site do cerbot nos orientar como instalar o cerbot utilizando nginx. Depois de criado conseguimos acessar a aplicação com um dominio com certificado SSL seguro.
![route53-img](readme-img/route53.png) 

* Segurança - Na segurança da API configuramos o rate-limiting com o redis para previnir a aplicação de ataques DDoS.

![rate-limiting](readme-img/rate-limiting.png)

  
* Monitoramento - No monitoramento da aplicação utilizamos o Sentry para capturar toda as atividades feitas nas rotas da aplicação. E também qualquer tipo de error gerado nas rotas ou em qualquer parte da api.

![sentry-issues](readme-img/sentry-issues.png)
![sentry-routes](readme-img/sentry-routes.png)
![sentry-details](readme-img/sentry-details.png)


## Project access

### Open && Run
```bash
# Clone este repositório
$ git clone <https://github.com/kaiomoreira-dev/api-culinary-recipe.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd api-culinary-recipe

# Instale as dependências
$ yarn ou npm install

# Build do projeto
$ yarn build

# Rodar as mirgations do banco
$ yarn migrations

# Exutar apenas o container do postgres
$ docker-compose up -d

## Iniciar aplicação

// desenvolvimento
$ yarn dev ou npm run dev

// teste
$ yarn test ou npm run test

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# O banco de dados do postgres fica no docker na porta 5432:5432
```
## Next Releases
* Adicionar novas rotas com funcionalidades CRUD ao restante das Entidades.
* Funcionalidade para inserir imagens da Recipe.
* Modelegem de UML Pessoa/Users
* Sistema de authenticação de Users com JSON web token.
* Criação de middleware para segurança das rotas
* Implementar serviço S3 da AWS para salvar imagens da Recipe.
* ...e mais.

## Techniques && Technologies

* ![Typescript](https://img.shields.io/badge/-Typescript-%234F4F4F)
* ![TypeORM](https://img.shields.io/badge/-TypeORM-%234F4F4F)
* ![Node.js](https://img.shields.io/badge/-Node.js-%234F4F4F)
* ![Express](https://img.shields.io/badge/-Express-%234F4F4F)
* ![TDD](https://img.shields.io/badge/-TDD-%234F4F4F)
* ![Princípios SOLID](https://img.shields.io/badge/-Princ%C3%ADpios%20SOLID-%234F4F4F)
* ![Clean Code](https://img.shields.io/badge/-Clean%20Code-%234F4F4F)
* ![Modelagem UML](https://img.shields.io/badge/-Modelagem%20UML-%234F4F4F)
* ![CI/CD](https://img.shields.io/badge/-CI%2FCD-%234F4F4F)
* ![Git](https://img.shields.io/badge/-Git-%234F4F4F)
* ![Github](https://img.shields.io/badge/-Github-%234F4F4F)
* ![API REST design](https://img.shields.io/badge/-API%20REST%20design-%234F4F4F)
* ![Design Pattern](https://img.shields.io/badge/-Design%20Pattern-%234F4F4F)
* ![Docker](https://img.shields.io/badge/-Docker-%234F4F4F)
* ![DevOps](https://img.shields.io/badge/-devOps-%234F4F4F)
* ![AWS](https://img.shields.io/badge/-AWS-%234F4F4F)
* ![SWagger](https://img.shields.io/badge/-Swagger-%09%234F4F4F)
* ![Jest](https://img.shields.io/badge/-Jest-%234F4F4F)
* ![Test unitário](https://img.shields.io/badge/-Test%20unit%C3%A1rio-%234F4F4F)
* ![Test de integração](https://img.shields.io/badge/-Test%20de%20integra%C3%A7%C3%A3o-%234F4F4F)

# Owner
[<img src="https://avatars.githubusercontent.com/u/56137536?s=400&u=a74073f1d0f605815a4f343436c791ab7b7dc184&v=4" width=115><br><sub>Kaio Moreira</sub>](https://github.com/kaiomoreira-dev)