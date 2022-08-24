import { CreateEmailController } from "@modules/author/useCases/createEmail.ts/CreateEmailController";
import { Router } from "express";

export const emailRoutes = Router();

export const createEmailController = new CreateEmailController();

emailRoutes.post("/", createEmailController.handle);
