import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";

import { Email } from "../infra/typeorm/entities/Email";

export interface IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email>;
    list(): Promise<Email[]>;

    findById(id: string): Promise<Email>;
    findByEmail(e_mail: string): Promise<Email>;

    updateById(id: string, newE_mail: string): Promise<Email>;

    deleteById(id: string): Promise<void>;
}
