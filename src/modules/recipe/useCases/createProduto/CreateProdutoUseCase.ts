import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateProdutoUseCase {
    constructor(
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository
    ) {}

    async execute({
        id,
        name,
        description,
        ingredients,
    }: ICreateProdutoDTO): Promise<Produto> {
        const produtoValidator = await this.produtoRepository.findProdutoByName(
            name
        );

        if (produtoValidator) {
            throw new AppError("Produto already exists", 401);
        }

        const produto = await this.produtoRepository.create({
            id,
            name,
            description,
            ingredients,
        });

        return produto;
    }
}
