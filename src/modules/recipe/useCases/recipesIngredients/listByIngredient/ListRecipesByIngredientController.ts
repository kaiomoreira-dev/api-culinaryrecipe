import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRecipesByIngredientUseCase } from "./ListRecipesByIngredientUseCase";

export class ListRecipesByIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { ingredient_id } = request.body;

        const listAllRecipesByImgredientProdutoNameUseCase = container.resolve(
            ListRecipesByIngredientUseCase
        );

        const recipes =
            await listAllRecipesByImgredientProdutoNameUseCase.execute(
                ingredient_id
            );

        return response.status(200).json(recipes);
    }
}
