import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProdutosUseCase } from "./ListProdutosUseCase";

export class ListProdutosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createProdutoUseCase = container.resolve(ListProdutosUseCase);

        const produtos = await createProdutoUseCase.execute();

        return response.status(200).json(produtos);
    }
}
