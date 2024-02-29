import { noop } from "lodash";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    EFormBuilderMode,
    TBuilderAction,
    TBuilderContext,
    TBuilderState,
} from "./types";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: TBuilderState = {
    mode: EFormBuilderMode.ADD_FIELD,
    showPanel: false,
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
            state.showPanel = action.payload;
            break;
        }
    }
    return state;
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

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
