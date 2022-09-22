import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateProdutoUseCase {
  constructor(
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(id: string): Promise<Produto> {
    const findProduto = await this.produtoRepository.findById(id);

    if (!findProduto) {
      throw new AppError("Produto not found", 404);
    }

    const updateProduto = await this.produtoRepository.updateById(
      findProduto.id
    );

    return updateProduto;
  }
}
