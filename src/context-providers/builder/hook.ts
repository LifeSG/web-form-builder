import { useContext } from "react";
import { BuilderContext } from "./provider";
import { EFormBuilderMode } from "./types";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = (isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    };

    const toggleMode = (mode: EFormBuilderMode) => {
        dispatch({
            type: "toggle-panel",
            payload: false,
        });

        dispatch({
            type: "toggle-mode",
            payload: mode,
        });
    };

    return {
        state,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        togglePanel,
        toggleMode,
    };
};
