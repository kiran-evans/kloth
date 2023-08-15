import { Reducer } from "react";

export type AppState = {
    user: any
}

export type ContextAction = {
    type: string,
    payload: any
}

export const stateReducer = ((state, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'SET_USER':
            newState.user = action.payload;
            break;
        default:
            return state;
    }
    return newState;
}) satisfies Reducer<AppState, ContextAction>