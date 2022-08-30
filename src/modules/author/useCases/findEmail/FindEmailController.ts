import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindEmailUseCase } from "./FindEmailUseCase";

export class FindEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { e_mail } = request.body;

        const findEmailUseCase = container.resolve(FindEmailUseCase);

        const email = await findEmailUseCase.execute(e_mail);

        return response.status(200).json(email);
    }
}
