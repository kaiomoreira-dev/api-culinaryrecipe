import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";

import { Email } from "../infra/typeorm/entities/Email";

export interface IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email>;
    list(): Promise<Email[]>;

    findEmailById(id: string): Promise<Email>;

    updateE_mailById(id: string, newE_mail: string): Promise<Email>;

    deleteEmailById(id: string): Promise<void>;
}
