import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListEmailsUseCase } from "./ListEmailsUseCase";

export class ListEmailsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listEmailsUseCase = container.resolve(ListEmailsUseCase);

        const emails = await listEmailsUseCase.execute();

        return response.status(200).json(emails);
    }
}
