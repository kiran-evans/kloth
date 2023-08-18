export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    categories: string[],
    sizes: string[],
    colours: string[],
    imageUrl: string
}

export type CartItem = {
    product: Product,
    quantity: number
}