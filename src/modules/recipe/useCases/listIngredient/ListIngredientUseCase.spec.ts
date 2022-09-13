import { faker } from "@faker-js/faker";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { CreateIngredientUseCase } from "../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { ListProdutosUseCase } from "../listProdutos/ListProdutosUseCase";
import { ListIngredientUseCase } from "./ListIngredientUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let listIngredientUseCase: ListIngredientUseCase;

describe("List ingredients UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();

        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );
        listIngredientUseCase = new ListIngredientUseCase(
            ingredientRepositoryInMemory
        );
    });

    it("should be able to list ingredients", async () => {
        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };
        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Cebola",
            description: faker.lorem.paragraphs(),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);

        const createProduto2 = await createProdutoUseCase.execute(produto2);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            name: "Alho",
            produto_id: createProduto1.id,
            unity: 1,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            name: "Cebola",
            produto_id: createProduto2.id,
            unity: 1,
            weight: 100,
        };

        await createIngredientUseCase.execute(ingredient1);

        await createIngredientUseCase.execute(ingredient2);

        const listIngredients = await listIngredientUseCase.execute();

        expect(listIngredients[0]).toHaveProperty("id");
    });
});
