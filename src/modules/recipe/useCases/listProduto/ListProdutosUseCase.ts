import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListProdutosUseCase {
    constructor(
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository
    ) {}

    async execute(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.list();

        return produtos;
    }
}
