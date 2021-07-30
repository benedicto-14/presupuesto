import { Action, createReducer, on } from "@ngrx/store";
import * as actionsUI from "./ui.actions";

export interface Load {
    isLoading:boolean;
}

const initState: Load = { 
    isLoading: false
};

const reducer = createReducer(initState,
    on(actionsUI.ACTIVAR_LOADING,(state) => {
        return {isLoading:true};
    }),
    on(actionsUI.DESACTIVAR_LOADING,(state) => {
        return {isLoading:false};;
    })
);

export function uiReducer(state:Load | undefined, action:Action) {
    return reducer(state,action);
}