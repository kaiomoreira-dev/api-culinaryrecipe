import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

export class CreateIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, description, produto_id, weight, unity } = request.body;

        const createIngredientUseCase = container.resolve(
            CreateIngredientUseCase
        );

        const ingredient = await createIngredientUseCase.execute({
            id,
            description,
            produto_id,
            weight,
            unity,
        });

        return response.status(200).json(ingredient);
    }
}
