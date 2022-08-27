import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";

import { Email } from "../infra/typeorm/entities/Email";

export interface ICreateAuthorDTO {
    id?: string;

    name: string;

    whatsapp: string;

    emails?: Email[];

    recipes?: Recipe[];
}
