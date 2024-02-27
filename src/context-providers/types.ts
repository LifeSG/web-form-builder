import React from "react";
import { EFormBuilderMode, EFormBuilderView } from "src/types";

// =============================================================================
// STATE
// =============================================================================

export interface IFormBuilderState {
    mode: EFormBuilderMode;
    view: EFormBuilderView;
}

// =============================================================================
// ACTIONS
// =============================================================================

export type TFormBuilderAction = Record<string, never>;

// =============================================================================
// CONTEXT
// =============================================================================

export type TFormBuilderContext = ContextType<
    IFormBuilderState,
    TFormBuilderAction
>;

export type ContextType<State, Action> = {
    state: State;
    dispatch: React.Dispatch<Action>;
};
