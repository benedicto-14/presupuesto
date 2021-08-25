import { ActionReducerMap } from "@ngrx/store";
import * as fromUI from "./shared/ui.reducer";
import * as fromAuth from "./auth/auth.reducer";
//import * as fromIE from "./ingreso-egreso/ingreso-egreso.reducer";

export interface AppState {
    ui:fromUI.Load,
    auth:fromAuth.AuthState,
    //ingresoEgreso:fromIE.IngresoEgresoState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui:fromUI.uiReducer,
    auth:fromAuth.authReducer,
    //ingresoEgreso: fromIE.ingresoEgresoReducer
}