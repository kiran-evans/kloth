import { fb } from "./firebase";
import { CartItem } from "./types";

export const updateCart = async (newCartItems: Array<CartItem>) => {
    // Send this new cart to the server to replace the one in the db
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await fb.auth.currentUser?.getIdToken()}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: newCartItems })
    });
    if (!res.ok) throw res.statusText;

    const newCart: Array<CartItem> = await res.json();
    if (!newCart) throw `res.json() was ${JSON.stringify(newCart)}`;
    
    return newCart;
}

export const addToCart = async (cartItem: CartItem, existingCartItems: Array<CartItem>) => {
    // If the existing cart is empty, just add the cart item
    if (!existingCartItems.length) return await updateCart([cartItem]);
    
    // Only spread the existingCartItems if it is not empty
    const newCartItems = [...existingCartItems];
    for (let i = 0; i < existingCartItems.length; i++) {
        // If the current cart already contains this item with the same product_id, colour and size, just increase the quantity of the existing item instead of adding a duplicate
        if (
            (existingCartItems[i].product_id === cartItem.product_id)
            && (existingCartItems[i].colour === cartItem.colour)
            && (existingCartItems[i].size === cartItem.size)
        ) {
            existingCartItems[i].quantity += cartItem.quantity;
            break;
        }

        // If you get to the end of the array and no items matched, add the cartItem into the new array
        if (i >= existingCartItems.length - 1) newCartItems.push(cartItem);
    }

    return await updateCart(newCartItems);
}