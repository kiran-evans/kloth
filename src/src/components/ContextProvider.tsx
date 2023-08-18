import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { Dispatch, createContext, useEffect, useReducer } from "react";
import { fb } from "../lib/firebase";
import { AppState, ContextAction, stateReducer } from "../lib/stateReducer";
import { CartItem } from "../lib/types";

const initState: AppState = {
    user: {} as User,
    cart: Array<CartItem>()
};

export const AppContext = createContext<{ state: AppState, dispatch: Dispatch<ContextAction> }>({ state: initState, dispatch: () => {} });

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    // On app load, login the user anonymously
    useEffect(() => {
        signInAnonymously(fb.auth);
    }, []);

    onAuthStateChanged(fb.auth, async (user) => {
        if (!user) {
            // If Firebase Auth user has become null, sign in a new anonymous user
            // The state.user object should NEVER be null, so it must be replaced whenever onAuthStateChanged produces null
            const userCredential = await signInAnonymously(fb.auth);

            // Create new user in the db, using anonymous idToken
            const idToken = await userCredential.user.getIdToken();
            await fetch(`${import.meta.env.VITE_API_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ idToken })
            });

            dispatch({ type: 'SET_USER', payload: userCredential.user });
            dispatch({ type: 'SET_CART', payload: Array<CartItem>() });

        } else {
            // Combine contents of cart in state.cart and the cart in the database associated with the now logged in user
            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${await user.getIdToken()}`, {
                method: 'PATCH',
                body: JSON.stringify({ items: state.cart })
            });

            dispatch({ type: 'SET_USER', payload: user });
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