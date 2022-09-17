import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindEmailUseCase } from "./FindEmailUseCase";

export class FindEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email: e_mail } = request.query;

        const emailFormat = String(e_mail);

        const findEmailUseCase = container.resolve(FindEmailUseCase);

        const email = await findEmailUseCase.execute(emailFormat);

        return response.status(200).json(email);
    }
}
