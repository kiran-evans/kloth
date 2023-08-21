import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { Dispatch, createContext, useEffect, useReducer } from "react";
import { fb } from "../lib/firebase";
import { AppState, ContextAction, stateReducer } from "../lib/stateReducer";
import { CartItem } from "../lib/types";

const initState: AppState = {
    user: {} as User,
    cartItems: Array<CartItem>()
};

export const AppContext = createContext<{ state: AppState, dispatch: Dispatch<ContextAction> }>({ state: initState, dispatch: () => {} });

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    // On app load, login the user anonymously if there is none logged in already
    useEffect(() => {
        if (!fb.auth.currentUser) signInAnonymously(fb.auth);
    }, []);

    onAuthStateChanged(fb.auth, async (user) => {        
        if (!user) {
            localStorage.clear();

            // If Firebase Auth user has become null, sign in a new anonymous user
            // The state.user object should NEVER be null, so it must be replaced whenever onAuthStateChanged produces null
            await signInAnonymously(fb.auth);
            return;
        }
        
        // Don't need to sign in again if there's already a user signed in
        if (localStorage.getItem("user") && localStorage.getItem("cart")) return;

        // If this is a user which has just been signed in anonymously, we need to create a new user in the db
        if (user.isAnonymous) {
            // Create new user in the db, using anonymous idToken
            const idToken = await user.getIdToken();
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken: idToken })
            });

            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: 'SET_USER', payload: user });

            localStorage.setItem("cart", JSON.stringify(Array<CartItem>()));
            dispatch({ type: 'SET_CART', payload: Array<CartItem>() });

        } else {
            // Combine contents of cart in state.cartItems and the cart in the database associated with the now logged in user
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await user.getIdToken()}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: state.cartItems })
            });

            localStorage.setItem("user", JSON.stringify(user));
            dispatch({ type: 'SET_USER', payload: user });

            localStorage.setItem("cart", JSON.stringify((await res.json()).items));
            dispatch({ type: 'SET_CART', payload: (await res.json()).items });
        }
    });

    return (
        <AppContext.Provider value={{
            state,
            dispatch
        }}>{children}</AppContext.Provider>
    )
}