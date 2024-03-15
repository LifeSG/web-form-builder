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

export type TFocusFieldAction = {
    type: "focus-field";
    payload: TField | null;
};
export type TUpdateElementIdsAction = {
    type: "update-element-ids";
    payload: string[];
};

export type TBuilderAction =
    | TTogglePanelAction
    | TUpdateElementIdsAction
    | TFocusFieldAction;

// =============================================================================
// CONTEXT
// =============================================================================
export type TBuilderContext = TContextType<TBuilderState, TBuilderAction>;
