import { onAuthStateChanged } from "firebase/auth";
import { Dispatch, createContext, useReducer } from "react";
import { fb } from "../lib/firebase";
import { AppState, ContextAction, stateReducer } from "../lib/stateReducer";

const initState: AppState = {
    user: null
};

export const AppContext = createContext<{ state: AppState, dispatch: Dispatch<ContextAction> }>({ state: initState, dispatch: () => {} });

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    onAuthStateChanged(fb.auth, (user) => {
        dispatch({ type: 'SET_USER', payload: user });
    });

    return (
        <AppContext.Provider value={{
            state,
            dispatch
        }}>{children}</AppContext.Provider>
    )
}