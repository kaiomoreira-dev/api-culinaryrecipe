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

## Diagrama de Classe UML
![mer-culinary-recipe](diagram-culinary-recipe.png)

## Coverage Jest
![coverage-jest](coverage-jest.png)

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

## Produto
**Requisito Funcional**
* Deve ser possivel cadastrar um produto.
* Deve ser possivel listar todos os produtos existentes.
* Deve ser possivel atualizar um produto por id.

**Regra de Negócio**
* Não deve ser possivel cadastrar um produto com o mesmo nome.
* Não deve ser possivel atualizar um produto com id invalido.



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

## Iniciar aplicação

// desenvolvimento
$ yarn dev ou npm run dev

// teste
$ yarn test ou npm run test

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# O banco de dados do postgres fica no docker na porta 5432:5432

```
