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
    onClickActionButton?: () => void;
}

export interface IDisplayState {
    toasts: IToast[];
    modals: TModalProps[];
}

export type TModalProps = IDiscardChangesModalProps;

// =============================================================================
// MODAL STATE
// =============================================================================
export enum EModalType {
    DiscardChanges = "discard-changes",
}

export interface IDiscardChangesModalProps {
    type: EModalType.DiscardChanges;
    onClickActionButton?: () => void;
    index?: number;
}

// =============================================================================
// MODAL ACTIONS
// =============================================================================

export interface ISetModalAction {
    type: "set-modal";
    payload: TModalProps;
}

export interface IHideModalAction {
    type: "hide-modal";
    payload?: EModalType;
}
export type TModalAction = ISetModalAction | IHideModalAction;

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
export type TDisplayAction = IShowToast | IDismissToast | TModalAction;

//=============================================================================
// CONTEXT
// =============================================================================
export type TDisplayContext = {
    state: IDisplayState;
    dispatch: Dispatch<TDisplayAction>;
};
