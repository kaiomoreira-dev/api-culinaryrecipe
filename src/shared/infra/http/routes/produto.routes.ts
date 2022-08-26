import { CreateProdutoController } from "@modules/recipe/useCases/createProduto/CreateProdutoController";
import { Router } from "express";

const produtoRoutes = Router();

const createProdutoController = new CreateProdutoController();

produtoRoutes.post("/", createProdutoController.handle);
