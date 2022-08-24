import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { Email } from "./Email";

@Entity("authors")
export class Author {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    whatsapp: string;

    @OneToMany(() => Recipe, (recipe) => recipe.author)
    recipes: Recipe[];

    @OneToMany(() => Email, (email) => email.author)
    emails: Email[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
