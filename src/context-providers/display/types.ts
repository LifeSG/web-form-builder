import { Dispatch } from "react";

// =============================================================================
// STATE
// =============================================================================
export enum EToastTypes {
    DELETE_TOAST = "delete-toast",
    SUCCESS_TOAST = "success-toast",
}

export interface IToast {
    id?: string;
    type?: EToastTypes;
    message?: string;
    toastFunction?: () => void;
}

export interface IDisplayState {
    toasts: IToast[];
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
    payload: string;
}
export type TDisplayAction = IShowToast | IDismissToast;

//=============================================================================
// CONTEXT
// =============================================================================
export type TDisplayContext = {
    state: IDisplayState;
    dispatch: Dispatch<TDisplayAction>;
};
