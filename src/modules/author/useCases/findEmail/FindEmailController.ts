import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindEmailUseCase } from "./FindEmailUseCase";

export class FindEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findEmailUseCase = container.resolve(FindEmailUseCase);

        const email = await findEmailUseCase.execute(id);

        return response.status(200).json(email);
    }
}
