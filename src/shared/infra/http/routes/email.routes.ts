import { CreateEmailController } from "@modules/author/useCases/createEmail/CreateEmailController";
import { ListEmailsController } from "@modules/author/useCases/listEmails/ListEmailsController";
import { Router } from "express";

export const emailRoutes = Router();

const createEmailController = new CreateEmailController();

const listEmailsController = new ListEmailsController();

emailRoutes.post("/", createEmailController.handle);

emailRoutes.get("/", listEmailsController.handle);
