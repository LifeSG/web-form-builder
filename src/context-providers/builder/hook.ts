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

    const focusElement = useCallback((element: TElement) => {
        dispatch({
            type: "focus-element",
            payload: {
                element,
                isDirty: true, // TODO: Validate and check if dirty
            },
        });
    }, []);

    // const deleteElement = useCallback(
    //     (elementId: string) => {
    //         if (state.elementIds.length > 0) {
    //             const newElementIds = state.elementIds.filter(
    //                 ({ id }) => id !== elementId
    //             );

    //             if (newElementIds.length < state.elementIds.length) {
    //                 dispatch({
    //                     type: "update-element-ids",
    //                     payload: newElementIds,
    //                 });
    //             }
    //         }
    //     },
    //     [state.elementIds]
    // );

    const toggleMode = useCallback((mode: EBuilderMode) => {
        dispatch({
            type: "toggle-mode",
            payload: mode,
        });
    }, []);

    return {
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        orderedIdentifiers: state.orderedIdentifiers,
        focusedElement: state.focusedElement,
        elements: state.elements,
        togglePanel,
        toggleMode,
        updateOrderedIdentifiers,
        addElement,
        focusElement,
        // deleteElement,
    };
};
