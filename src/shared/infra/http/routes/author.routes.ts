import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { FindAuthorByNameController } from "@modules/author/useCases/findAuthor/FindAuthorByNameController";
import { ListAuthorController } from "@modules/author/useCases/listAuthor/ListAuthorController";
import { UpdateAuthorController } from "@modules/author/useCases/updateAuthor/UpdateAuthorUseController";
import { Router } from "express";

export const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();

const listAuthorController = new ListAuthorController();

const findAuthorByNameController = new FindAuthorByNameController();

const updateAuthorController = new UpdateAuthorController();

authorRoutes.post("/", createAuthorController.handle);

authorRoutes.get("/", listAuthorController.handle);

authorRoutes.get("/find", findAuthorByNameController.handle);

authorRoutes.put("/update", updateAuthorController.handle);
