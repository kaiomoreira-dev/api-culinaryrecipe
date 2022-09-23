import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListIngredientByProdutoUseCase {
  constructor(
    @inject("IngredientRepository")
    private ingredientRepository: IIngredientRepository,
    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(produto_id: string): Promise<Ingredient[]> {
    const findProduto = await this.produtoRepository.findById(produto_id);

    if (!findProduto) {
      throw new AppError("Produto not found", 404);
    }

    const ingredients = await this.ingredientRepository.listByProdutoId(
      produto_id
    );

    return ingredients;
  }
}
