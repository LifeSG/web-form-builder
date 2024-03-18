import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    EBuilderMode,
    IBuilderState,
    TBuilderAction,
    TBuilderContext,
} from "./types";
import { noop } from "lodash";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: IBuilderState = {
    mode: EBuilderMode.PRISTINE,
    elements: new Map(),
    focusedElement: null,
    showSidePanel: false,
    elementIds: [],
};

// =============================================================================
// REDUCER
// =============================================================================
export const builderReducer = (
    state: IBuilderState,
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
        case "update-element-ids": {
            state.elementIds = action.payload;
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
