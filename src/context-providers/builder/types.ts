import { TElement } from "src/schemas";
import { Dispatch } from "react";

export enum EBuilderMode {
    /** The initial state */
    PRISTINE = "prisine",
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

export interface IBuilderState {
    mode: EBuilderMode;
    showSidePanel: boolean;
    elements: Map<[internalId: string], TElement>;
    focusedElement: IFocusedElement | null;
    /**
     * Specifies the elements that have been created and used in
     * the element list panel
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
