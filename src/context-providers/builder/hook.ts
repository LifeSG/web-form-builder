import { useCallback, useContext } from "react";
import { BuilderContext } from "./provider";
import { EBuilderMode, IElementId } from "./types";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = useCallback((isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    }, []);

    const addElement = useCallback(
        (elementId: IElementId) => {
            const newElementIds = [...state.elementIds, elementId];
            dispatch({
                type: "update-element-ids",
                payload: newElementIds,
            });
        },
        [state.elementIds]
    );

    const deleteElement = useCallback(
        (elementId: string) => {
            if (state.elementIds.length > 0) {
                const newElementIds = state.elementIds.filter(
                    ({ id }) => id !== elementId
                );

                if (newElementIds.length < state.elementIds.length) {
                    dispatch({
                        type: "update-element-ids",
                        payload: newElementIds,
                    });
                }
            }
        },
        [state.elementIds]
    );

    const toggleMode = useCallback((mode: EBuilderMode) => {
        dispatch({
            type: "toggle-mode",
            payload: mode,
        });
    }, []);

    return {
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        createdElementsIds: state.elementIds,
        focusedElement: state.focusedElement,
        togglePanel,
        toggleMode,
        addElement,
        deleteElement,
    };
};
