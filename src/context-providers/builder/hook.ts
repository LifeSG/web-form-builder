import { useCallback, useContext } from "react";
import { EElementType, TElement } from "src/schemas";
import { ElementObjectGenerator } from "src/util";
import { BuilderContext } from "./provider";
import { EBuilderMode, IElementIdentifier } from "./types";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = useCallback((isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    }, []);

    const updateOrderedIdentifiers = useCallback(
        (orderedIdentifiers: IElementIdentifier[]) => {
            dispatch({
                type: "update-ordered-identifiers",
                payload: orderedIdentifiers,
            });
        },
        [state.orderedIdentifiers]
    );

    const addElement = useCallback(
        (type: EElementType, setFocus?: boolean) => {
            const existingIdentifiers = state.orderedIdentifiers.map(
                (elementId) => elementId.internalId
            );
            const newElement: TElement = ElementObjectGenerator.generate(
                type,
                existingIdentifiers
            );
            const newOrderedIdentifiers = [
                ...state.orderedIdentifiers,
                { internalId: newElement.internalId },
            ];

            dispatch({
                type: "add-element",
                payload: {
                    element: newElement,
                    orderedIdentifiers: newOrderedIdentifiers,
                },
            });

            if (setFocus) {
                dispatch({
                    type: "focus-element",
                    payload: {
                        element: newElement,
                        isDirty: true,
                    },
                });
            }
        },
        [state.orderedIdentifiers]
    );

    const deleteElement = useCallback(
        (internalId: string) => {
            const { [internalId]: removedElement, ...remaining } =
                state.elements;
            const newOrderedIdentifiers = state.orderedIdentifiers.filter(
                (identifier) => identifier.internalId !== internalId
            );

            dispatch({
                type: "delete-element",
                payload: {
                    updatedElements: remaining,
                    orderedIdentifiers: newOrderedIdentifiers,
                },
            });

            if (state.mode === EBuilderMode.EDIT_ELEMENT) {
                toggleMode(EBuilderMode.ADD_ELEMENT);
            }
        },
        [state.orderedIdentifiers, state.elements, state.mode]
    );

    const focusElement = useCallback((element: TElement, isDirty = false) => {
        dispatch({
            type: "focus-element",
            payload: {
                element,
                isDirty,
            },
        });
    }, []);

    const removeFocusedElement = useCallback(() => {
        dispatch({
            type: "remove-focused-element",
        });
    }, []);

    const toggleMode = useCallback((mode: EBuilderMode) => {
        dispatch({
            type: "toggle-mode",
            payload: mode,
        });
    }, []);

    return {
        elements: state.elements,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        orderedIdentifiers: state.orderedIdentifiers,
        focusedElement: state.focusedElement,
        togglePanel,
        toggleMode,
        updateOrderedIdentifiers,
        addElement,
        deleteElement,
        focusElement,
        removeFocusedElement,
        pages: state.pages,
        currentPage: state.pages[state.currentPageId],
    };
};
