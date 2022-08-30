import e, { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateE_mailByE_mailUseCase } from "./UpdateEmailByE_mailUseCase";

export class UpdateE_mailByE_mailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { oldE_mail, newE_mail } = request.body;

        const updateE_mailByE_mailUseCase = container.resolve(
            UpdateE_mailByE_mailUseCase
        );

        const email = updateE_mailByE_mailUseCase.execute(oldE_mail, newE_mail);

        return response.status(200).json(email);
    }
}
