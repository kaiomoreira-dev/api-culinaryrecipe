import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

export class DeleteAuthorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteAuthorUseCase = container.resolve(DeleteAuthorUseCase);

        await deleteAuthorUseCase.execute(id);

        return response
            .status(200)
            .json({ message: "Author deleted successfully!" });
    }
}
