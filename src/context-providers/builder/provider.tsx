import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { TBuilderState, TBuilderAction, TBuilderContext } from "./types";
import { EFormBuilderMode } from "src/types";
import { noop } from "lodash";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: TBuilderState = {
    mode: EFormBuilderMode.ADD_FIELD,
};

// =============================================================================
// REDUCER
// =============================================================================
export const builderReducer = (state: TBuilderState, action: TBuilderAction) => {
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
