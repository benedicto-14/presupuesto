import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";

export const SET_USER = createAction(
    '[Auth] Set User',
    props<{user:User}>()
);

export const UN_SET_USER = createAction(
    '[Auth] Un Set User',
    props<{user:User}>()
);