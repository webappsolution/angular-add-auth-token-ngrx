export interface Beer {
    id: string;
    name: string;
    brewery: string;
    rating: number;
}

export const defaultBeer: Beer = {
    id: null,
    name: "",
    brewery: "",
    rating: 0
};
