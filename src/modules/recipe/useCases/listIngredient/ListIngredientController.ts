import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListIngredientUseCase } from "./ListIngredientUseCase";

export class ListIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listIngredientUseCase = container.resolve(ListIngredientUseCase);

        const ingredients = await listIngredientUseCase.execute();

        return response.status(200).json(ingredients);
    }
}
