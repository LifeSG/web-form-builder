import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    EBuilderMode,
    TBuilderAction,
    TBuilderContext,
    TBuilderState,
} from "./types";
import { noop } from "lodash";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: TBuilderState = {
    mode: EBuilderMode.ADD_FIELD,
    fields: new Map(),
    focusedField: null,
    showSidePanel: false,
};

// =============================================================================
// REDUCER
// =============================================================================
export const builderReducer = (
    state: TBuilderState,
    action: TBuilderAction
) => {
    switch (action.type) {
        case "toggle-panel": {
            state.showSidePanel = action.payload;
            break;
        }
    }
    switch (action.type) {
        case "focus-field":
            state.focusedField = action.payload;
            break;
    }

    return state;
};

// =============================================================================
// CONTEXT
// =============================================================================
export const BuilderContext = createContext<TBuilderContext>({
    state: DEFAULT_VALUES,
    dispatch: noop,
});

// =============================================================================
// CONTEXT PROVIDER
// =============================================================================
export const BuilderProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, dispatch] = useImmerReducer(builderReducer, DEFAULT_VALUES);

    return (
        <BuilderContext.Provider value={{ state, dispatch }}>
            {children}
        </BuilderContext.Provider>
    );
};
