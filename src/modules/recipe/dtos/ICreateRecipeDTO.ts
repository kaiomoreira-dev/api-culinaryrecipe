import { Ingredient } from "../infra/typeorm/entities/Ingredient";

enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

enum DishType {
    appetizer = "appetizer",
    main_course = "main course",
    dessert = "dessert",
}

export interface ICreateRecipeDTO {
    id?: string;
    name: string;
    description: string;
    ingredients?: Ingredient[];
    author_name?: string;
    time: number;
    difficulty: Difficulty;
    dish_type: DishType;
    additional_features: string;
    total_guests: number;
}
