import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Produto } from "./Produto";

@Entity("ingredients")
export class Ingredient {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    // relacionamento de many-to-one apontando para produto qual
    // ingrediente deve pertencer a produto
    @ManyToOne(() => Produto, (produto) => produto.ingredients)
    @JoinColumn({ name: "produto_id" })
    produto?: Produto;

    @Column()
    produto_id: string;

    @Column()
    weight: number;

    @Column()
    unity: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
