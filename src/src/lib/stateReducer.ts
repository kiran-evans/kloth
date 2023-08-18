import { User } from "firebase/auth";
import { Reducer } from "react";
import { CartItem } from "./types";

export type AppState = {
    user: User,
    cartItems: Array<CartItem>
}

export type ContextAction = {
    type: string,
    payload: Array<CartItem> | User
}

export const stateReducer = ((state, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'SET_USER':
            newState.user = action.payload as User;
            break;
        case 'SET_CART':
            newState.cartItems = action.payload as Array<CartItem>;
            break;
        default:
            return state;
    }
    return newState;
}) satisfies Reducer<AppState, ContextAction>