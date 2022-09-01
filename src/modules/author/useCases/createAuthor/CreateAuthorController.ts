import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

export class CreateAuthorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, whatsapp } = request.body;

        const createAuthorUseCase = container.resolve(CreateAuthorUseCase);

        const author = await createAuthorUseCase.execute({
            name,
            whatsapp,
        });

        return response.status(200).json(author);
    }
}
