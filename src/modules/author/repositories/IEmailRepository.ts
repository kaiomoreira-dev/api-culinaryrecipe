import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";

import { Email } from "../infra/typeorm/entities/Email";

export interface IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email>;
    list(): Promise<Email[]>;

    findEmailByE_mail(email: string): Promise<Email>;
    deleteEmailByEmail(e_mail: string): Promise<void>;
}
