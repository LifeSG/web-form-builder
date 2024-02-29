import { TContextType } from "../types";

export enum EFormBuilderMode {
    ADD_FIELD = "add-field",
    EDIT_FIELD = "edit-field",
    EDIT_PAGE = "edit-page",
}

// =============================================================================
// STATE
// =============================================================================
export type TBuilderState = {
    mode: EFormBuilderMode;
};

// =============================================================================
// ACTIONS
// =============================================================================
export type TBuilderAction = Record<string, never>;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
