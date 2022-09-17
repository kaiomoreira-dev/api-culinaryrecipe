import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { DeleteAuthorController } from "@modules/author/useCases/deleteAuthor/DeleteAuthorController";
import { FindAuthorIdController } from "@modules/author/useCases/findAuthorById/FindAuthorIdController";
import { ListAuthorController } from "@modules/author/useCases/listAuthor/ListAuthorController";
import { UpdateAuthorController } from "@modules/author/useCases/updateAuthor/UpdateAuthorUseController";
import { Router } from "express";

export const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();

const listAuthorController = new ListAuthorController();

const findAuthorIdController = new FindAuthorIdController();

const updateAuthorController = new UpdateAuthorController();

const deleteAuthorController = new DeleteAuthorController();

authorRoutes.post("/", createAuthorController.handle);

authorRoutes.get("/", listAuthorController.handle);

authorRoutes.get("/:id", findAuthorIdController.handle);

authorRoutes.put("/:id", updateAuthorController.handle);

authorRoutes.delete("/:id", deleteAuthorController.handle);
