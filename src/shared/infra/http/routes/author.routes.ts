import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { DeleteAuthorController } from "@modules/author/useCases/deleteAuthor/DeleteAuthorController";
import { FindAuthorIdController } from "@modules/author/useCases/findAuthor/FindAuthorIdController";
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

authorRoutes.get("/find/:id", findAuthorIdController.handle);

authorRoutes.put("/update", updateAuthorController.handle);

authorRoutes.delete("/delete", deleteAuthorController.handle);
