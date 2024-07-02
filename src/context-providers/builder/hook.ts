import { useCallback, useContext } from "react";
import { ElementObjectGenerator } from "src/util";
import { EElementType, TElement } from "./element.types";
import { BuilderContext } from "./provider";
import {
    EBuilderMode,
    IDeletedElements,
    IElementIdentifier,
    TElementMap,
} from "./types";

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
        []
    );

    const addElement = useCallback(
        (type: EElementType, setFocus?: boolean) => {
            const existingIdentifiers = state.orderedIdentifiers.map(
                (elementId) => elementId.internalId
            );
            const existingIds = Object.values(state.elements).map(
                (element) => element.id
            );
            const newElement: TElement = ElementObjectGenerator.generate(
                type,
                existingIdentifiers,
                existingIds
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
                        isDirty: false,
                    },
                });
            }
        },
        [state.orderedIdentifiers, state.elements]
    );

    const duplicateElement = useCallback(
        (element: TElement) => {
            const existingIdentifiers = state.orderedIdentifiers.map(
                (elementId) => elementId.internalId
            );
            const existingIds = Object.values(state.elements).map(
                (element) => element.id
            );

            const duplicatedElement = ElementObjectGenerator.duplicate(
                element,
                existingIdentifiers,
                existingIds
            );
            const newOrderedIdentifiers = [
                ...state.orderedIdentifiers,
                { internalId: duplicatedElement.internalId },
            ];

            dispatch({
                type: "add-element",
                payload: {
                    element: duplicatedElement,
                    orderedIdentifiers: newOrderedIdentifiers,
                },
            });

            dispatch({
                type: "focus-element",
                payload: {
                    element: duplicatedElement as TElement,
                    isDirty: true,
                },
            });
        },
        [state.orderedIdentifiers]
    );

    const deleteElement = useCallback(
        (internalId: string) => {
            const position = state.orderedIdentifiers.findIndex(
                (identifier) => identifier.internalId === internalId
            );

            const { [internalId]: removedElement, ...remaining } =
                state.elements;

            const newOrderedIdentifiers = state.orderedIdentifiers.filter(
                (identifier) => identifier.internalId !== internalId
            );

            const remainingElements: TElementMap = Object.fromEntries(
                Object.entries(remaining).map(
                    ([key, child]: [string, TElement]) => [
                        key,
                        {
                            ...child,
                            conditionalRendering:
                                child.conditionalRendering.filter(
                                    (condition) =>
                                        condition.internalId !== internalId
                                ),
                        },
                    ]
                )
            );

            const deletedElementData = {
                element: removedElement,
                position,
            };

            const newDeletedElements: IDeletedElements = {
                ...state.deletedElements,
                [internalId]: deletedElementData,
            };

            dispatch({
                type: "delete-element",
                payload: {
                    updatedElements: remainingElements,
                    orderedIdentifiers: newOrderedIdentifiers,
                    deletedElements: newDeletedElements,
                    lastDeletedInternalId: internalId,
                },
            });

            if (state.focusedElement !== null) {
                removeFocusedElement();
                toggleMode(EBuilderMode.ADD_ELEMENT);
            }
        },
        [
            state.orderedIdentifiers,
            state.elements,
            state.mode,
            state.deletedElements,
            state.lastDeletedInternalId,
        ]
    );

    const undoDeleteElement = useCallback(
        (internalId: string) => {
            const deletedElementData = state.deletedElements[internalId];

            if (deletedElementData) {
                const { element, position } = deletedElementData;
                const newOrderedIdentifiers = [
                    ...state.orderedIdentifiers.slice(0, position),
                    { internalId },
                    ...state.orderedIdentifiers.slice(position),
                ];
                dispatch({
                    type: "undo-delete-element",
                    payload: {
                        updatedElements: {
                            ...state.elements,
                            [internalId]: element,
                        },
                        orderedIdentifiers: newOrderedIdentifiers,
                        deletedElements: Object.fromEntries(
                            Object.entries(state.deletedElements).filter(
                                ([key]) => key !== internalId
                            )
                        ),
                    },
                });
            }
        },
        [state.deletedElements, state.orderedIdentifiers, state.elements]
    );

    const focusElement = useCallback((element: TElement) => {
        dispatch({
            type: "focus-element",
            payload: {
                element,
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

    const updateElement = useCallback((element: TElement) => {
        dispatch({
            type: "update-element",
            payload: element,
        });
    }, []);

    const updateFocusedElement = useCallback(
        (isDirty: boolean, element?: TElement) => {
            dispatch({
                type: "update-focused-element",
                payload: {
                    isDirty: isDirty,
                    element: element,
                },
            });
        },
        []
    );

    return {
        deletedElements: state.deletedElements,
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
        undoDeleteElement,
        focusElement,
        removeFocusedElement,
        updateElement,
        updateFocusedElement,
        duplicateElement,
    };
};
