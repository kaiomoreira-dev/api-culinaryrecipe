import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";

import { Email } from "../infra/typeorm/entities/Email";

export interface IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email>;
    list(): Promise<Email[]>;

    findEmailByE_mail(e_mail: string): Promise<Email>;

    updateE_mailByE_mail(e_mail: string): Promise<Email>;

    deleteEmailByE_mail(e_mail: string): Promise<void>;
}
