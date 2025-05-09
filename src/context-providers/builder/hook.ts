import { useCallback, useContext } from "react";
import { ElementObjectGenerator } from "src/util";
import { EElementType, TElement } from "./element.types";
import { BuilderContext } from "./provider";
import {
    EBuilderMode,
    IDeletedElementMap,
    IElementIdentifier,
    TElementMap,
} from "./types";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const toggleSubmitting = useCallback((isSubmitting: boolean) => {
        dispatch({
            type: "toggle-submitting",
            payload: isSubmitting,
        });
    }, []);

    const togglePanel = useCallback((isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    }, []);

    const updateOrderedIdentifiers = useCallback(
        (orderedIdentifiers: IElementIdentifier[]) => {
            const positionAndSize = orderedIdentifiers.map(
                ({ position, size }) => ({
                    position,
                    size,
                })
            );

            const sortedPositions = [...positionAndSize].sort(
                (a, b) => a.position - b.position
            );

            const updatedOrderedIdentifiers = orderedIdentifiers.map(
                (identifier, index) => {
                    const { size, position } = sortedPositions[index];
                    return {
                        ...identifier,
                        position,
                        size,
                    };
                }
            );

            dispatch({
                type: "update-ordered-identifiers",
                payload: updatedOrderedIdentifiers,
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

            const newOrderedIdentifiers: IElementIdentifier[] = [
                ...state.orderedIdentifiers,
                {
                    internalId: newElement.internalId,
                    position: state.elementCounter,
                    size: "full",
                } as IElementIdentifier,
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
            const duplicatedElementSize = state.orderedIdentifiers.find(
                (identifier) => identifier.internalId === element.internalId
            ).size;

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
                {
                    internalId: duplicatedElement.internalId,
                    position: state.elementCounter,
                    size: duplicatedElementSize,
                } as IElementIdentifier,
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
                    isDirty: false,
                },
            });
        },
        [state.orderedIdentifiers]
    );

    const deleteElement = useCallback(
        (internalId: string) => {
            const { [internalId]: deletedElement, ...remaining } =
                state.elements;

            const deletedElementIdentifier = state.orderedIdentifiers.find(
                (identifier) => identifier.internalId === internalId
            );

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
                                child?.conditionalRendering?.filter(
                                    (condition) =>
                                        condition.internalId !== internalId
                                ),
                        },
                    ]
                )
            );

            const newDeletedElements: IDeletedElementMap = {
                ...state.deletedElements,
                [internalId]: {
                    element: deletedElement,
                    position: deletedElementIdentifier.position,
                    size: deletedElementIdentifier.size,
                },
            };

            dispatch({
                type: "delete-element",
                payload: {
                    updatedElements: remainingElements,
                    orderedIdentifiers: newOrderedIdentifiers,
                    deletedElements: newDeletedElements,
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
            state.focusedElement,
        ]
    );

    const undoDeleteElement = useCallback(
        (internalId: string) => {
            const deletedElement = state.deletedElements[internalId];

            if (!deletedElement) {
                return;
            }

            const existingOrderedIdentifiers = state.orderedIdentifiers;

            let insertionIndex = existingOrderedIdentifiers.findIndex(
                (identifier) => identifier.position > deletedElement.position
            );

            if (insertionIndex === -1) {
                insertionIndex = existingOrderedIdentifiers.length;
            }

            const newOrderedIdentifiers = [...existingOrderedIdentifiers];

            newOrderedIdentifiers.splice(insertionIndex, 0, {
                internalId,
                position: deletedElement.position,
                size: deletedElement.size,
            });

            dispatch({
                type: "undo-delete-element",
                payload: {
                    updatedElements: {
                        ...state.elements,
                        [internalId]: deletedElement.element,
                    },
                    orderedIdentifiers: newOrderedIdentifiers,
                    deletedElements: Object.fromEntries(
                        Object.entries(state.deletedElements).filter(
                            ([key]) => key !== internalId
                        )
                    ),
                },
            });
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

    const updateElementSchema = useCallback(
        (
            elements?: TElementMap,
            orderedIdentifiers?: IElementIdentifier[],
            newFocusedElement?: TElement
        ) => {
            dispatch({
                type: "update-schema-element",
                payload: {
                    elements,
                    orderedIdentifiers,
                },
            });

            if (newFocusedElement) {
                dispatch({
                    type: "remove-focused-element",
                });

                dispatch({
                    type: "focus-element",
                    payload: {
                        element: newFocusedElement,
                    },
                });
            }
        },
        []
    );

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

    const selectElementType = useCallback((type: EElementType) => {
        dispatch({
            type: "select-element-type",
            payload: type,
        });
    }, []);

    return {
        isSubmitting: state.isSubmitting,
        deletedElements: state.deletedElements,
        elements: state.elements,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        orderedIdentifiers: state.orderedIdentifiers,
        focusedElement: state.focusedElement,
        selectedElementType: state.selectedElementType,
        toggleSubmitting,
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
        selectElementType,
        updateElementSchema,
    };
};
