import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRecipesByIngredientUseCase } from "./ListRecipesByIngredientUseCase";

export class ListRecipesByIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listAllRecipesByImgredientProdutoNameUseCase = container.resolve(
            ListRecipesByIngredientUseCase
        );

        const recipes =
            await listAllRecipesByImgredientProdutoNameUseCase.execute(id);

        return response.status(200).json(recipes);
    }
}
