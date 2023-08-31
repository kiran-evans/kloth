export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    categories: string[],
    sizes: string[],
    colours: string[],
    img_url: string
}

export type CartItem = {
    product_id: string,
    quantity: number,
    colour: string,
    size: string
}

export type CartDisplayItem = {
    cartItemData: CartItem;
    productData: Product;
}