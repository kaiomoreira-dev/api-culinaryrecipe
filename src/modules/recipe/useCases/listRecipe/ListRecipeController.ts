import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRecipeUseCase } from "./ListRecipeUseCase";

export class ListRecipecontroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRecipeUseCase = container.resolve(ListRecipeUseCase);

    const recipes = await listRecipeUseCase.execute();

    return response.status(200).json(recipes);
  }
}
