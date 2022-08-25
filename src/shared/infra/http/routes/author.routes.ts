import { CreateAuthorController } from "@modules/author/useCases/createAuthor/CreateAuthorController";
import { Router } from "express";

export const authorRoutes = Router();

const createAuthorController = new CreateAuthorController();

authorRoutes.post("/", createAuthorController.handle);
