import { Dispatch } from "react";

// =============================================================================
// ENUMS
// =============================================================================
export enum EFormBuilderMode {
    ADD_FIELD = "add-field",
    EDIT_FIELD = "edit-field",
    EDIT_PAGES = "edit-page",
}

// =============================================================================
// STATE
// =============================================================================
export interface IElementId {
    id: string;
    parentId?: string;
}

export interface IBuilderState {
    mode: EFormBuilderMode;
    showSidePanel: boolean;
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
