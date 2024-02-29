import { TContextType } from "../types";

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
    showPanel: boolean;
};

// =============================================================================
// ACTIONS
// =============================================================================
export type TTogglePanel = {
    type: "toggle-panel";
    payload: boolean;
};

export type TBuilderAction = TTogglePanel;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
