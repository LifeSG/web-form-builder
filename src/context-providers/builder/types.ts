import { TElement } from "src/schemas";
import { TContextType } from "../types";

export enum EBuilderMode {
    /** Mode where we get to select the elements to add */
    ADD_ELEMENT = "add-element",
    /** Mode where we edit the attributes of an element */
    EDIT_ELEMENT = "edit-element",
    /** Mode where we add and edit the pages */
    EDIT_PAGES = "edit-pages",
}

// =============================================================================
// STATE
// =============================================================================
export type TElementId = {
    id: string;
    parentId?: string;
};

export type TBuilderState = {
    mode: EBuilderMode;
    showSidePanel: boolean;
    elements: Map<[internalId: string], TElement>;
    focusedElement: TElement | null;
    /**
     * Specifies the elements that have been created and used in
     * the element list panel
     */
    elementIds: TElementId[];
};

// =============================================================================
// ACTIONS
// =============================================================================
export type TTogglePanelAction = {
    type: "toggle-panel";
    payload: boolean;
};

export type TUpdateElementIdsAction = {
    type: "update-element-ids";
    payload: TElementId[];
};

export type TBuilderAction = TTogglePanelAction | TUpdateElementIdsAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
