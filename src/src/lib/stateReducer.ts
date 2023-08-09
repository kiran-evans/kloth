import { Dispatch, Reducer } from "react";

export type AppState = {
    user: any,
    dispatch: Dispatch<ContextAction>
}

export type ContextAction = {
    type: string,
    payload: any
}

export const stateReducer = ((state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}) satisfies Reducer<AppState, ContextAction>