import { Dispatch } from "react";
export declare enum EToastTypes {
    DELETE_ELEMENT_TOAST = "delete-element-toast",
    SUCCESS_TOAST = "success-toast"
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
export type TModalProps = IDiscardChangesModalProps | IBulkEditModalProps | IResetFieldsModalProps;
export declare enum EModalType {
    DiscardChanges = "discard-changes",
    BulkEdit = "bulk-edit",
    ResetFields = "reset-fields"
}
export interface IDiscardChangesModalProps {
    type: EModalType.DiscardChanges;
    onClickActionButton?: () => void;
    index?: number;
}
export interface IBulkEditModalProps {
    type: EModalType.BulkEdit;
    optionsString: string;
    onClickActionButton: (content: string) => void;
}
export interface IResetFieldsModalProps {
    type: EModalType.ResetFields;
    onClickActionButton: () => void;
    onClose: () => void;
}
export interface ISetModalAction {
    type: "set-modal";
    payload: TModalProps;
}
export interface IHideModalAction {
    type: "hide-modal";
    payload?: EModalType;
}
export type TModalAction = ISetModalAction | IHideModalAction;
export interface IShowToast {
    type: "show-toast";
    payload: IToast;
}
export interface IDismissToast {
    type: "dismiss-toast";
    payload: string;
}
export type TDisplayAction = IShowToast | IDismissToast | TModalAction;
export type TDisplayContext = {
    state: IDisplayState;
    dispatch: Dispatch<TDisplayAction>;
};
