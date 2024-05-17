export type Receipt = {
    recipeName: string,
    additional: string,
    timeInMinutes: number,
    nationality:string;
    difficulty: string;
    ingredients: string[];
    making: string;
    vegetarian: boolean;
    vegan: boolean;
    user: string;
    imageSrc: string;
}