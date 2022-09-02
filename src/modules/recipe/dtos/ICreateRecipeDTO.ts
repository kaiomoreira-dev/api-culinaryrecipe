import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface ICreateRecipeDTO {
    id?: string;
    name: string;
    description: string;
    ingredients?: Ingredient[];
    author_name: string;
    time: number;
    difficulty: "easy" | "medium" | "hard";
    dish_type: "appetizer" | "main_course" | "dessert";
    additional_features: string;
    total_guests: number;
}
