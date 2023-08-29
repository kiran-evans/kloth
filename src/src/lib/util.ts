import { fb } from "./firebase";
import { CartItem } from "./types";

export const addToCart = async (newCartItem: CartItem): Promise<Array<string>> => {
    // Send this new cart to the server to replace the one in the db
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await fb.auth.currentUser?.getIdToken()}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item: newCartItem })
    });
    return res.json();
}