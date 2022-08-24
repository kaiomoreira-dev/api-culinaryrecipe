import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEmailUseCase } from "./CreateEmailUseCase";

export class CreateEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const createEmailUseCase = container.resolve(CreateEmailUseCase);

        const e_mail = await createEmailUseCase.execute(email);

        return response.status(200).json(e_mail);
    }
}
