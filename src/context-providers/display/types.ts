import { Dispatch } from "react";

// =============================================================================
// STATE
// =============================================================================
export enum EToastTypes {
    DELETE_ELEMENT_TOAST = "delete-element-toast",
    SUCCESS_TOAST = "success-toast",
}

export interface IToast {
    id?: string;
    type?: EToastTypes;
    message?: string;
    elementInternalId?: string;
}

export interface IDisplayState {
    toasts: IToast[];
    modals: TModalProps[];
}

export type TModalProps =
    | IDiscardChangesModalProps
    | IBulkEditModalProps
    | IResetFieldsModalProps;

// =============================================================================
// MODAL STATE
// =============================================================================
export enum EModalType {
    DiscardChanges = "discard-changes",
    BulkEdit = "bulk-edit",
    ResetFields = "reset-fields",
}

export interface IDiscardChangesModalProps {
    type: EModalType.DiscardChanges;
    onClickActionButton?: () => void;
    index?: number;
}

export interface IBulkEditModalProps {
    type: EModalType.BulkEdit;
    dropdownItemsString: string;
    onClickActionButton: (content: string) => void;
}

export interface IResetFieldsModalProps {
    type: EModalType.ResetFields;
    onClickActionButton: () => void;
    onClose: () => void;
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
