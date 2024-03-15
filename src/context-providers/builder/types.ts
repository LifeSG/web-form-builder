import { TContextType } from "../types";

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
export type TBuilderState = {
    mode: EFormBuilderMode;
    showSidePanel: boolean;
    /**
     * Specifies the elements that have been created and used in
     * the element list panel
     */
    elementIds: string[];
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
    payload: string[];
};

export type TBuilderAction = TTogglePanelAction | TUpdateElementIdsAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
