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
    deletedElements: {},
    elementCounter: 0,
    selectedElementType: null,
    isSubmitting: false,
};

// =============================================================================
// REDUCER
// =============================================================================
export const builderReducer = (
    state: IBuilderState,
    action: TBuilderAction
) => {
    switch (action.type) {
        case "toggle-submitting": {
            state.isSubmitting = action.payload;
            break;
        }
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
            state.elementCounter += 1;
            break;
        }
        case "delete-element":
        case "undo-delete-element": {
            state.elements = action.payload.updatedElements;
            state.orderedIdentifiers = action.payload.orderedIdentifiers;
            state.deletedElements = action.payload.deletedElements;
            break;
        }
        case "focus-element": {
            state.focusedElement = action.payload;
            state.selectedElementType = action.payload.element.type;
            break;
        }
        case "remove-focused-element": {
            state.focusedElement = null;
            break;
        }
        case "update-element": {
            const internalId = state.focusedElement.element.internalId;
            state.elements = {
                ...state.elements,
                [internalId]: { ...action.payload, internalId: internalId },
            };
            break;
        }
        case "update-focused-element": {
            if (action.payload.element) {
                const newFocusedElement = {
                    ...action.payload.element,
                    internalId: state.focusedElement.element.internalId,
                };
                state.focusedElement = {
                    ...state.focusedElement,
                    isDirty: action.payload.isDirty,
                    element: newFocusedElement,
                };
            } else {
                state.focusedElement = {
                    ...state.focusedElement,
                    isDirty: action.payload.isDirty,
                };
            }
            break;
        }
        case "select-element-type": {
            state.selectedElementType = action.payload;
            break;
        }
        case "update-schema-element": {
            state.elements = {
                ...action.payload.elements,
            };
            state.orderedIdentifiers = action.payload.orderedIdentifiers;
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
