import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Ingredient } from "./Ingredient";

@Entity("recipes")
export class Recipe {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.id)
    @JoinTable({
        name: "recipes_ingredients",
        joinColumns: [{ name: "recipe_id" }],
        inverseJoinColumns: [{ name: "ingredient_id" }],
    })
    @Column()
    ingredients: Ingredient;

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
