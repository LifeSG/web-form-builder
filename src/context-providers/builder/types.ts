import { Dispatch } from "react";
import { TElement } from "./element.types";

export enum EBuilderMode {
    /** Mode where we get to select the elements to add */
    ADD_ELEMENT = "add-element",
    /** Mode where we edit the attributes of an element */
    EDIT_ELEMENT = "edit-element",
    /** Mode where we add and edit the pages */
    EDIT_PAGES = "edit-pages",
}

export enum ETextFieldMode {
    EMAIL_FIELD = "email-field",
    NUMERIC_FIELD = "numeric-field",
    TEXT_FIELD = "text-field",
    CONTACT_FIELD = "contact-field",
    TEXTAREA_FIELD = "textarea-field",
}

// =============================================================================
// STATE
// =============================================================================
export interface IElementIdentifier {
    internalId: string;
    parentInternalId?: string;
}

export interface IFocusedElement {
    element: TElement;
    isDirty?: boolean;
    isValid?: boolean;
}

export type TElementMap = {
    [internalId: string]: TElement;
};

export interface IDeletedElements {
    [internalId: string]: {
        element: TElement;
        position: number;
    };
}

export interface IBuilderState {
    mode: EBuilderMode;
    showSidePanel: boolean;
    elements: TElementMap;
    focusedElement: IFocusedElement | null;
    /**
     * Specifies the internalId of elements that have been created and
     * is used in the main panel. This will be used to determine the
     * rendering order
     */
    orderedIdentifiers: IElementIdentifier[];
    deletedElements: IDeletedElements;
}

// =============================================================================
// ACTIONS
// =============================================================================
export interface ITogglePanelAction {
    type: "toggle-panel";
    payload: boolean;
}

export interface IToggleModeAction {
    type: "toggle-mode";
    payload: EBuilderMode;
}

export interface IUpdateOrderedIdentifiersAction {
    type: "update-ordered-identifiers";
    payload: IElementIdentifier[];
}

export interface IAddElementAction {
    type: "add-element";
    payload: {
        element: TElement;
        orderedIdentifiers: IElementIdentifier[];
    };
}

export interface IDeleteElementAction {
    type: "delete-element";
    payload: {
        updatedElements: TElementMap;
        orderedIdentifiers: IElementIdentifier[];
        deletedElements: IDeletedElements;
    };
}

export interface IUndoDeleteElementAction {
    type: "undo-delete-element";
    payload: {
        updatedElements: TElementMap;
        orderedIdentifiers: IElementIdentifier[];
        deletedElements: IDeletedElements;
    };
}

export interface IFocusElementAction {
    type: "focus-element";
    payload: IFocusedElement;
}

export interface IRemoveFocusedElementAction {
    type: "remove-focused-element";
}

export interface IUpdateElementAction {
    type: "update-element";
    payload: TElement;
}

export interface IUpdateFocusedElementAction {
    type: "update-focused-element";
    payload: {
        isDirty: boolean;
        element?: TElement;
    };
}

export type TBuilderAction =
    | ITogglePanelAction
    | IUpdateOrderedIdentifiersAction
    | IToggleModeAction
    | IAddElementAction
    | IDeleteElementAction
    | IUndoDeleteElementAction
    | IFocusElementAction
    | IRemoveFocusedElementAction
    | IUpdateElementAction
    | IUpdateFocusedElementAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = {
    state: IBuilderState;
    dispatch: Dispatch<TBuilderAction>;
};
