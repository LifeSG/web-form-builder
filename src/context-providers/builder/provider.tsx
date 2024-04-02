import { noop } from "lodash";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import {
    EBuilderMode,
    IBuilderState,
    TBuilderAction,
    TBuilderContext,
} from "./types";

// =============================================================================
// DEFAULT VALUES
// =============================================================================
const DEFAULT_VALUES: IBuilderState = {
    mode: EBuilderMode.ADD_ELEMENT,
    elements: {},
    focusedElement: null,
    showSidePanel: true,
    orderedIdentifiers: [],
    pastMode: {},
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
        case "update-ordered-identifiers": {
            state.orderedIdentifiers = action.payload;
            break;
        }
        case "add-element": {
            const element = action.payload.element;
            state.elements[element.internalId] = element;
            state.orderedIdentifiers = action.payload.orderedIdentifiers;
            break;
        }
        case "delete-element": {
            state.elements = action.payload.updatedElements;
            state.orderedIdentifiers = action.payload.orderedIdentifiers;
            break;
        }
        case "focus-element": {
            state.focusedElement = action.payload;
            state.mode = EBuilderMode.EDIT_ELEMENT;
            break;
        }
        case "remove-focused-element": {
            state.focusedElement = null;
            break;
        }
        case "set-past-mode": {
            state.pastMode = action.payload;
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
