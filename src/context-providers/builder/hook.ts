import { useContext } from "react";
import { BuilderContext } from "./provider";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = (isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    };

    return {
        state,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        togglePanel,
    };
};
