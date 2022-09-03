import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface ICreateRecipeDTO {
    id?: string;
    name: string;
    description: string;
    ingredients?: Ingredient[];
    author_id: string;
    time: number;
    difficulty: string;
    dish_type: string;
    additional_features: string;
    total_guests: number;
}
