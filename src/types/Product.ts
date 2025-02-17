export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
    category?: string;
    featured?: boolean;
    quantity?: number;
    rating?: number;
    reviews?: number;
}