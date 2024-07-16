import { Dispatch } from "react";
import { EElementType, TElement } from "./element.types";

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
    position: number;
}

export interface IFocusedElement {
    element: TElement;
    isDirty?: boolean;
    isValid?: boolean;
}

export interface IDeletedElement {
    element: TElement;
    position: number;
}

export interface IDeletedElementMap {
    [internalId: string]: IDeletedElement;
}

export type TElementMap = {
    [internalId: string]: TElement;
};

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
    deletedElements: IDeletedElementMap;
    /**
     * Keeps track of the number of unique elements that have been added to the builder from the start.
     */
    elementCounter: number;
    selectedElementType: EElementType | null;
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
        deletedElements: IDeletedElementMap;
    };
}

export interface IUndoDeleteElementAction {
    type: "undo-delete-element";
    payload: {
        updatedElements: TElementMap;
        orderedIdentifiers: IElementIdentifier[];
        deletedElements: IDeletedElementMap;
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

export interface ISelectElementTypeAction {
    type: "select-element-type";
    payload: EElementType;
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
    | IUpdateFocusedElementAction
    | ISelectElementTypeAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = {
    state: IBuilderState;
    dispatch: Dispatch<TBuilderAction>;
};
