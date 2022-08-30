import { CreateEmailController } from "@modules/author/useCases/createEmail/CreateEmailController";
import { FindEmailController } from "@modules/author/useCases/findEmail/FindEmailController";
import { ListEmailsController } from "@modules/author/useCases/listEmails/ListEmailsController";
import { Router } from "express";

export const emailRoutes = Router();

const createEmailController = new CreateEmailController();

const listEmailsController = new ListEmailsController();

const findEmailController = new FindEmailController();

emailRoutes.post("/", createEmailController.handle);

emailRoutes.get("/", listEmailsController.handle);

emailRoutes.get("/find", findEmailController.handle);
