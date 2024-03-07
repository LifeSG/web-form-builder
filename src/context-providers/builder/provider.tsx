import noop from "lodash/noop";
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
        case "toggle-mode": {
            state.mode = action.payload;
            break;
        }
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
