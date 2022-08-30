import e, { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEmailByE_mailUseCase } from "./UpdateEmailByE_mailUseCase";

export class UpdateEmailByE_mailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { e_mail } = request.body;

        const updateE_mailByE_mail = container.resolve(
            UpdateEmailByE_mailUseCase
        );

        const email = updateE_mailByE_mail.execute(e_mail);

        return response.status(200).json(email);
    }
}
