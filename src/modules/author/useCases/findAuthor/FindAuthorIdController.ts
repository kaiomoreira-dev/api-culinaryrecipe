import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAuthorIdUseCase } from "./FindAuthorIdUseCase";

export class FindAuthorIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const findAuthorById = container.resolve(FindAuthorIdUseCase);

        const author = await findAuthorById.execute(id);

        return response.status(200).json(author);
    }
}
