import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

export class DeleteAuthorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const deleteAuthorUseCase = container.resolve(DeleteAuthorUseCase);

        await deleteAuthorUseCase.execute(name);

        return response
            .status(200)
            .json({ message: "Author deleted successfully!" });
    }
}
