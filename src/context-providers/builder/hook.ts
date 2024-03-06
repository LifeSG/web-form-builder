import { useContext } from "react";
import { BuilderContext } from "./provider";
import { TFocusFieldAction } from "./types";

export const useBuilder = () => {
    const { state, dispatch } = useContext(BuilderContext);

    const togglePanel = (isCollapsed: boolean) => {
        dispatch({
            type: "toggle-panel",
            payload: isCollapsed,
        });
    };

    const getFocusControls = (internalId: string) => {
        const setFocus = (payload: TFocusFieldAction["payload"]) => {
            dispatch({
                type: "focus-field",
                payload,
            });
        };

        return {
            isFocused: state.focusedField?.internalId === internalId,
            setFocus,
        };
    };

    return {
        state,
        showSidePanel: state.showSidePanel,
        currentMode: state.mode,
        togglePanel,
        getFocusControls,
    };
};
