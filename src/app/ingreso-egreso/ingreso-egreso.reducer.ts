import { Action, createReducer, on } from "@ngrx/store";
import { IngresoEgreso } from "./ingreso-egreso.model";
import * as actionsIngresoEgreso from "./ingreso-egreso.actions";
import { AppState } from "../app.reducer";

export interface IngresoEgresoState {
    items:IngresoEgreso[]
}

export interface AppStateIE extends AppState {
    ingresoEgreso:IngresoEgresoState
}

const estadoInicial:IngresoEgresoState = {
    items : []
}

const reducer = createReducer(estadoInicial,

    on(actionsIngresoEgreso.SET_ITEMS,(state,{ items }) => {
        //retorna un nuevo arreglo
        return { 
            items:[
                ...items.map(item => {
                    return {
                        ...item
                    }
                })
            ]
        }
    }),
    on(actionsIngresoEgreso.UNS_SET_ITEMS,(state)=>{
        return {
            items: []
        }      
    })
    
);

export function ingresoEgresoReducer(state:IngresoEgresoState | undefined, action:Action) {
    return reducer(state,action);
}