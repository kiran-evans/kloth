import { createContext, useReducer } from "react";
import { AppState, stateReducer } from "../lib/stateReducer";

const initState: AppState = {
    user: null,
    dispatch: () => {}
};

export const AppContext = createContext(initState);

export const ContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(stateReducer, initState);

    return (
        <AppContext.Provider value={{
            ...initState,
            dispatch
        }}>{children}</AppContext.Provider>
    )
}