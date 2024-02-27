import React from "react";
import { EFormBuilderMode, EFormBuilderView } from "src/types";

// =============================================================================
// STATE
// =============================================================================

export type TState = {
    mode: EFormBuilderMode;
    view: EFormBuilderView;
};

// =============================================================================
// ACTIONS
// =============================================================================

export type TAction = Record<string, never>;

// =============================================================================
// CONTEXT
// =============================================================================

export type TMainContext = TContextType<TState, TAction>;

export type TContextType<State, Action> = {
    state: State;
    dispatch: React.Dispatch<Action>;
};
