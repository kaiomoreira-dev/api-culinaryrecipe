import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

export class CreateIngredientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, description, name, weight, unity, animal, color } =
            request.body;

        const createIngredientUseCase = container.resolve(
            CreateIngredientUseCase
        );

        const ingredient = await createIngredientUseCase.execute({
            id,
            description,
            name,
            weight,
            unity,
            animal,
            color,
        });

        return response.status(200).json(ingredient);
    }
}
