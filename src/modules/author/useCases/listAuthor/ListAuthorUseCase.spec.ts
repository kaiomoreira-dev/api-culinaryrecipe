import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { ListAuthorUseCase } from "./ListAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let listAuthorUseCase: ListAuthorUseCase;

describe("List authors UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory();
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createRecipeUseCase = new CreateRecipeUseCase(
            recipeRepositoryInMemory,
            ingredientRepositoryInMemory
        );
        listAuthorUseCase = new ListAuthorUseCase(authorRepositoryInMemory);
    });
    it("should be able to list authors", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
            emails: [
                {
                    id: faker.datatype.uuid(),
                    e_mail: faker.internet.email(),
                    author_name: "Kaio Moreira",
                    created_at: faker.datatype.datetime(),
                    updated_at: faker.datatype.datetime(),
                },
            ],
            recipes: [
                {
                    id: faker.datatype.uuid(),
                    name: "Receita test 1",
                    description: faker.lorem.paragraphs(),
                    author_name: "Kaio Moreira",
                    difficulty: "medium",
                    dish_type: "appetizer",
                    time: 5,
                    total_guests: 5,
                    additional_features: "low custom",
                    ingredients: [
                        {
                            id: faker.datatype.uuid(),
                            description: faker.lorem.paragraphs(),
                            produto_name: "Alho roxo",
                            unity: 1,
                            weight: 100,
                            created_at: String(faker.datatype.datetime()),
                            updated_at: String(faker.datatype.datetime()),
                        },
                    ],
                    created_at: faker.datatype.datetime(),
                    updated_at: faker.datatype.datetime(),
                },
            ],
        };

        await createAuthorUseCase.execute(author);

        const listAuthors = await listAuthorUseCase.execute();

        // console.log(JSON.stringify(listAuthors, null, 2));

        expect(listAuthors[0]).toHaveProperty("id");
        expect(listAuthors[0]).toHaveProperty("emails");
        expect(listAuthors[0]).toHaveProperty("recipes");
    });
});
