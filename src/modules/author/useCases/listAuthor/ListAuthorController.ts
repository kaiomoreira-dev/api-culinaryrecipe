import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAuthorUseCase } from "./ListAuthorUseCase";

export class ListAuthorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listAuthorUseCase = container.resolve(ListAuthorUseCase);

        const authors = await listAuthorUseCase.execute();

        return response.status(200).json(authors);
    }
}
