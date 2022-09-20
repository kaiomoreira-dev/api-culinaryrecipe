## Descrição
* Essa aplicação tem como objetivo realizar um CRUD de Receitas culinária. A Receita poderá conter diversos Ingredients como partes que depende de um Produto. E um Author como reponsavel que poderá ter diversos e-mais especificos para contato.

### Pré-requisitos

* Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/). 
E o banco de dados Postgres:
[Postgres](https://www.postgresql.org/).
E o docker para utilizar docker-compose para subir o container do Postgres
[Docker](https://https://www.docker.com/).
E instalar o docker-compose pra subir o container.
[Docker-Compose](https://docs.docker.com/compose/install/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/kaiomoreira-dev/culinary-recipe.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd culinary-recipes

# Instale as dependências
$ yarn ou npm install

# Exutar apenas o container do postgres
$ docker-compose up -d

## criar database de test fin_api_test dentro do postgress
$ create database culinary_recipes_test

## Iniciar aplicação

// desenvolvimento
$ yarn dev ou npm run dev

// teste
$ yarn test ou npm run test

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# O banco de dados do postgres fica no docker na porta 5432:5432

```
