import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { ListAuthorController } from "@modules/author/useCases/listAuthor/ListAuthorController";
import { Router } from "express";

export const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();

const listAuthorController = new ListAuthorController();

authorRoutes.post("/", createAuthorController.handle);

authorRoutes.get("/", listAuthorController.handle);
