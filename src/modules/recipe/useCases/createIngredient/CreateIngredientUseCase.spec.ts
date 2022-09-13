import { faker } from "@faker-js/faker";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;

describe("Create ingredient UseCase", () => {
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
    });

    it("should be able to create ingredient", async () => {
        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            name: "Alho",
            produto_id: createProduto1.id,
            unity: 1,
            weight: 100,
        };

        const createIngredient1 = await createIngredientUseCase.execute(
            ingredient1
        );

        expect(createIngredient1).toHaveProperty("id");
    });
});
