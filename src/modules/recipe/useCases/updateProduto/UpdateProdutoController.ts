import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProdutoUseCase } from "./UpdateProdutoUseCase";

export class UpdateProdutoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateProdutoUseCase = container.resolve(UpdateProdutoUseCase);

    const produto = await updateProdutoUseCase.execute(id, name, description);

    return response.status(200).json(produto);
  }
}
