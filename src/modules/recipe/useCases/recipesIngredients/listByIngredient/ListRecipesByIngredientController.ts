import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllRecipesByImgredientProdutoNameUseCase } from "./ListRecipesByIngredientUseCase";

export class ListRecipesByIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { produto_name } = request.body;

        const listAllRecipesByImgredientProdutoNameUseCase = container.resolve(
            ListAllRecipesByImgredientProdutoNameUseCase
        );

        const recipes =
            await listAllRecipesByImgredientProdutoNameUseCase.execute(
                produto_name
            );

        return response.status(200).json(recipes);
    }
}
