import { Dispatch } from "react";

// =============================================================================
// STATE
// =============================================================================
export enum EToastTypes {
    DELETE_TOAST = "delete-toast",
    SUCCESS_TOAST = "success-toast",
}

export interface IToast {
    type?: EToastTypes;
    message?: string;
}

export interface IDisplayState {
    toast: IToast;
}

// =============================================================================
// ACTIONS
// =============================================================================
export interface IShowToast {
    type: "show-toast";
    payload: IToast;
}
export interface IDismissToast {
    type: "dismiss-toast";
}
export type TDisplayAction = IShowToast | IDismissToast;

//=============================================================================
// CONTEXT
// =============================================================================
export type TDisplayContext = {
    state: IDisplayState;
    dispatch: Dispatch<TDisplayAction>;
};
