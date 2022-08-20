export interface ICreateRecipeDTO {
    id?: string;
    name: string;
    description: string;
    ingredients: string;
    time: number;
    difficulty: string;
    dish_type: string;
    additional_features: string;
    total_guests: number;
}
