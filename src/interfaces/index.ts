export interface ProductInterface{
    name: string,
    price: number,
    description: string,
    images: string[],
    category: string,
    countInStock: number,
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    quantity: number
}