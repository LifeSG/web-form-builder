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
};

// =============================================================================
// ACTIONS
// =============================================================================
export type TTogglePanelAction = {
    type: "toggle-panel";
    payload: boolean;
};

export type TBuilderAction = TTogglePanelAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
