import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("recipes")
export class Recipe {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    ingredients: string;

    @Column()
    time: number;

    @Column()
    difficulty: string;

    @Column()
    dish_type: string;

    @Column()
    additional_features: string;

    @Column()
    total_guests: number;

    @Column()
    author: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
