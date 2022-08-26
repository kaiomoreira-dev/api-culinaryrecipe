import { CreateProdutoController } from "@modules/recipe/useCases/createProduto/CreateProdutoController";
import { Router } from "express";

export const produtoRoutes = Router();

const createProdutoController = new CreateProdutoController();

produtoRoutes.post("/", createProdutoController.handle);
