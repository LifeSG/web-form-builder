import { useCallback, useContext } from "react";
import { BuilderContext } from "./provider";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = useCallback((isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    }, []);

    const addElement = useCallback((elementId: string) => {
        const newElementIds = [...state.elementIds, elementId];
        dispatch({
            type: "update-element-ids",
            payload: newElementIds,
        });
    }, []);

    const deleteElement = useCallback((elementId: string) => {
        if (state.elementIds.length > 0) {
            const newElementIds = state.elementIds.filter(
                (id) => id !== elementId
            );

            if (newElementIds.length < state.elementIds.length) {
                dispatch({
                    type: "update-element-ids",
                    payload: newElementIds,
                });
            }
        }
    }, []);

    return {
        state,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        createdElements: state.elementIds,
        togglePanel,
        addElement,
        deleteElement,
    };
};
