import { CreateProdutoController } from "@modules/recipe/useCases/createProduto/CreateProdutoController";
import { ListProdutosController } from "@modules/recipe/useCases/listProdutos/ListProdutosController";
import { Router } from "express";

export const produtoRoutes = Router();

const createProdutoController = new CreateProdutoController();

const listProdutosController = new ListProdutosController();

produtoRoutes.post("/", createProdutoController.handle);

produtoRoutes.get("/", listProdutosController.handle);
