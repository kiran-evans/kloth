import { onAuthStateChanged } from "firebase/auth";
import { Dispatch, createContext, useReducer } from "react";
import { fb } from "../lib/firebase";
import { AppState, ContextAction, stateReducer } from "../lib/stateReducer";

const initState: AppState = {
    user: null,
    cartItemIds: Array<string>()
};

export const AppContext = createContext<{ state: AppState, dispatch: Dispatch<ContextAction> }>({ state: initState, dispatch: () => {} });

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    onAuthStateChanged(fb.auth, async (user) => {        
        if (user) {
            if (user.uid === state.user?.uid) return;

            // Replace the user's existing cart with the new session
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await user.getIdToken()}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: state.cartItemIds })
            });

            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: 'SET_USER', payload: user });

            const updatedUser = await res.json();

            localStorage.setItem("cart", JSON.stringify(updatedUser.cart_item_ids));
            dispatch({ type: 'SET_CART', payload: updatedUser.cart_item_ids });
        }
    });

    return (
        <AppContext.Provider value={{
            state,
            dispatch
        }}>{children}</AppContext.Provider>
    )
}