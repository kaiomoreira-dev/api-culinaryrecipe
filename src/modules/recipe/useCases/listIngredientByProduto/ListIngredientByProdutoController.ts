import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListIngredientByProdutoUseCase } from "./ListIngredientByProdutoUseCase";

export class ListIngredientByProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const produto_id = id;
    const listIngredientByProdutoUseCase = container.resolve(
      ListIngredientByProdutoUseCase
    );

    const ingredients = await listIngredientByProdutoUseCase.execute(
      produto_id
    );

    return response.status(200).json(ingredients);
  }
}
