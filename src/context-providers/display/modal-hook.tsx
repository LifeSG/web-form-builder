import { useCallback, useContext } from "react";
import { DisplayContext } from "./display-provider";
import { EModalType } from "./types";
// =============================================================================
// HOOK
// =============================================================================
export const useModal = () => {
    const { state, dispatch } = useContext(DisplayContext);

    const showModal = useCallback(
        (modal) => {
            dispatch({
                type: "set-modal",
                payload: modal,
            });
        },
        [dispatch]
    );

    const hideModal = useCallback(
        (type?: EModalType) =>
            dispatch({
                type: "hide-modal",
                payload: type,
            }),
        [dispatch]
    );

    return {
        modals: state.modals,
        showModal,
        hideModal,
    };
};
