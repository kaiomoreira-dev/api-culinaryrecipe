import {
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("recipes")
export class Recipe {
    @PrimaryColumn()
    id: string;

    name: string;

    description: string;

    ingredients: string[];

    time: number;

    difficulty: string;

    dish_type: string;

    additional_features: string;

    total_guests: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    constructor() {
        this.id = uuidv4();
    }
}
