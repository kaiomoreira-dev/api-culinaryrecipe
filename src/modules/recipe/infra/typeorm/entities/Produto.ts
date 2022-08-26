import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { Ingredient } from "./Ingredient";

@Entity("produtos")
export class Produto {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @OneToMany(() => Ingredient, (ingredient) => ingredient.produto_name)
    ingredients?: Ingredient[];

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
