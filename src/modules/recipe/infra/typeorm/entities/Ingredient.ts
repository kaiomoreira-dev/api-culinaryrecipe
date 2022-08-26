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
    description: string;

    @ManyToOne(() => Produto)
    @JoinColumn({ name: "produto_name", referencedColumnName: "name" })
    produtos?: Produto;

    @Column()
    produto_name: string;

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
