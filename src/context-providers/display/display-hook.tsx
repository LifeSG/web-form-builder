import { useCallback, useContext } from "react";
import { DisplayContext } from "./display-provider";
import { IToast } from "./types";

export const useDisplay = () => {
    const { state, dispatch } = useContext(DisplayContext);

    const showToast = useCallback((toast: IToast) => {
        dispatch({
            type: "show-toast",
            payload: toast,
        });
    }, []);

    const dismissToast = useCallback(() => {
        dispatch({
            type: "dismiss-toast",
        });
    }, []);

    return {
        showToast,
        dismissToast,
        toast: state.toast,
    };
};
