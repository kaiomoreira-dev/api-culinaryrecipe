import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProdutoUseCase } from "./CreateProdutoUseCase";

export class CreateProdutoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createProdutoUseCase = container.resolve(CreateProdutoUseCase);

        const produto = await createProdutoUseCase.execute({
            name,
            description,
        });

        return response.status(200).json(produto);
    }
}
