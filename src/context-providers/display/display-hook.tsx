import { useCallback, useContext } from "react";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import { DisplayContext } from "./display-provider";

export const useDisplay = () => {
    const { state, dispatch } = useContext(DisplayContext);

    const showToast = useCallback(
        (toast) => {
            const newId = SimpleIdGenerator.generate();
            dispatch({
                type: "show-toast",
                payload: { ...toast, id: newId},
            });
        },
        [dispatch, state.toasts]
    );

    const dismissToast = useCallback((id: string) => {
        dispatch({
            type: "dismiss-toast",
            payload: id,
        });
    }, []);

    return {
        showToast,
        dismissToast,
        toasts: state.toasts,
    };
};
