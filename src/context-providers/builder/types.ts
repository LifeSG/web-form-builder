import { EFormBuilderMode } from "src/types";
import { TContextType } from "../types";

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
