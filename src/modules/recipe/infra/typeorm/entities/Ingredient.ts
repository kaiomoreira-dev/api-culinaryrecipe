import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("ingredients")
export class Ingredient {
    @PrimaryColumn()
    id?: string;

    @Column()
    description: string;

    @Column()
    name: string;

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
