import { Dispatch, createContext, useReducer } from "react";
import { AppState, ContextAction, stateReducer } from "../lib/stateReducer";

const initState: AppState = {
    user: null
};

export const AppContext = createContext<{ state: AppState, dispatch: Dispatch<ContextAction> }>({ state: initState, dispatch: () => {} });

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    return (
        <AppContext.Provider value={{
            state,
            dispatch
        }}>{children}</AppContext.Provider>
    )
}