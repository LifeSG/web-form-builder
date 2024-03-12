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

    return {
        state,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        togglePanel,
        addElement,
    };
};
