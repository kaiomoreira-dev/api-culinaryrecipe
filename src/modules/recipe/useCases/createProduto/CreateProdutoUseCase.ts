import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateProdutoUseCase {
    constructor(
        @inject("ProdutoRepository")
        private produtoRepository: IProdutoRepository
    ) {}
}
