import { User } from "firebase/auth";
import { Reducer } from "react";

export type AppState = {
    user: User | null,
    cartItemIds: Array<string>
}

export type ContextAction = {
    type: string,
    payload: Array<string> | User
}

export const stateReducer = ((state, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'SET_USER':
            newState.user = action.payload as User;
            break;
        case 'SET_CART':            
            newState.cartItemIds = action.payload as Array<string>;            
            break;
        default:
            return state;
    }
    return newState;
}) satisfies Reducer<AppState, ContextAction>