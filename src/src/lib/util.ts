import { User } from "firebase/auth";
import { Dispatch } from "react";
import { ContextAction } from "./stateReducer";
import { CartItem } from "./types";

export const updateCart = async (newCartItems: Array<CartItem>, user: User, dispatch: Dispatch<ContextAction>) => {
    try {
        // Send this new cart to the server to replace the one in the db
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await user.getIdToken()}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: newCartItems })
        });

        dispatch({ type: 'SET_CART', payload: (await res.json()).items });

    } catch (err) {
        console.error(err);        
    }
}