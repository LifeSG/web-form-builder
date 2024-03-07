import { TContextType } from "../types";

// =============================================================================
// ENUMS
// =============================================================================
export enum EFormBuilderMode {
    ADD_FIELD = "add-field",
    EDIT_FIELD = "edit-field",
    EDIT_PAGES = "edit-page",
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

export type TToggleModeAction = {
    type: "toggle-mode";
    payload: EFormBuilderMode;
};

export type TBuilderAction = TTogglePanelAction | TToggleModeAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
