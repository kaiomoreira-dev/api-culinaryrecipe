import { CreateProdutoController } from "@modules/recipe/useCases/createProduto/CreateProdutoController";
import { ListProdutosController } from "@modules/recipe/useCases/listProdutos/ListProdutosController";
import { UpdateProdutoController } from "@modules/recipe/useCases/updateProduto/UpdateProdutoController";
import { Router } from "express";

export const produtoRoutes = Router();

const createProdutoController = new CreateProdutoController();

const listProdutosController = new ListProdutosController();

const updateProdutoController = new UpdateProdutoController();

produtoRoutes.post("/", createProdutoController.handle);

produtoRoutes.get("/", listProdutosController.handle);

produtoRoutes.put("/:id", updateProdutoController.handle);
