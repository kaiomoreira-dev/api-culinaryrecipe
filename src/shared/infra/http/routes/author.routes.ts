import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { FindAuthorByNameController } from "@modules/author/useCases/findAuthor/FindAuthorByNameController";
import { ListAuthorController } from "@modules/author/useCases/listAuthor/ListAuthorController";
import { Router } from "express";

export const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();

const listAuthorController = new ListAuthorController();

const findAuthorByNameController = new FindAuthorByNameController();

authorRoutes.post("/", createAuthorController.handle);

authorRoutes.get("/", listAuthorController.handle);

authorRoutes.get("/find", findAuthorByNameController.handle);
