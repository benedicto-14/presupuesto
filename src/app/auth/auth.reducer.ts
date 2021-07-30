import { Action, createReducer, on } from "@ngrx/store";
import { User } from "./user.model";
import * as actionsAuth from "./auth.actions";

export interface AuthState{
    user:User
}

const estadoInicial:AuthState = {
    user:new User('','','')
}

const reducer = createReducer(estadoInicial,
    on(actionsAuth.SET_USER, (state,{ user })=>{
        return { user: user }
    })
);

export function authReducer(state: AuthState | undefined, action:Action) {
    return reducer(state,action);
}