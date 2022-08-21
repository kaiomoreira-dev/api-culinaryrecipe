export interface ICreateIngredientDTO {
    id?: string;
    description: string;
    name: string;
    weight: number;
    unity: number;
    animal?: string;
    color?: string;
}
