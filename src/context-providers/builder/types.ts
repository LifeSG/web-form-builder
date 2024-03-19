import { TElement } from "src/schemas";
import { Dispatch } from "react";

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
export interface IElementId {
    id: string;
    parentId?: string;
}

export interface IFocusedElement {
    element: TElement;
    isDirty?: boolean;
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
    elementIds: IElementId[];
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

export interface IUpdateElementIdsAction {
    type: "update-element-ids";
    payload: IElementId[];
}

export type TBuilderAction =
    | ITogglePanelAction
    | IUpdateElementIdsAction
    | IToggleModeAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = {
    state: IBuilderState;
    dispatch: Dispatch<TBuilderAction>;
};
