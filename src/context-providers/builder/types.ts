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

// =============================================================================
// STATE
// =============================================================================
export interface IElementId {
    id: string;
    parentId?: string;
}

export interface IBuilderState {
    mode: EBuilderMode;
    showSidePanel: boolean;
    elements: Map<[internalId: string], TElement>;
    focusedElement: TElement | null;
    /**
     * Specifies the elements that have been created and used in
     * the element list panel
     */
    elementIds: IElementId[];
}

// =============================================================================
// ACTIONS
// =============================================================================
export type TTogglePanelAction = {
    type: "toggle-panel";
    payload: boolean;
};

export type TUpdateElementIdsAction = {
    type: "update-element-ids";
    payload: IElementId[];
};

export type TBuilderAction = TTogglePanelAction | TUpdateElementIdsAction;

// =============================================================================
// CONTEXT
// =============================================================================
type TContextType<State, Action> = {
    state: State;
    dispatch: Dispatch<Action>;
};

export type TBuilderContext = TContextType<IBuilderState, TBuilderAction>;
