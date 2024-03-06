import { TField } from "src/schemas";
import { TContextType } from "../types";

export enum EBuilderMode {
    ADD_FIELD = "add-field",
    EDIT_FIELD = "edit-field",
    EDIT_PAGES = "edit-page",
}

// =============================================================================
// STATE
// =============================================================================
export type TBuilderState = {
    mode: EBuilderMode;
    showSidePanel: boolean;
    fields: Map<string, TField>;
    focusedField: TField | null;
};

// =============================================================================
// ACTIONS
// =============================================================================
export type TTogglePanelAction = {
    type: "toggle-panel";
    payload: boolean;
};

export type TBuilderAction = TTogglePanelAction | TFocusFieldAction;

export type TFocusFieldAction = {
    type: "focus-field";
    payload: TField | null;
};

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
