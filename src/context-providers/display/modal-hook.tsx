import { useCallback, useContext } from "react";
import { useDisplay } from "./display-hook";
import { DisplayContext } from "./display-provider";
import { EModalType, EToastTypes, TModalProps } from "./types";
// =============================================================================
// HOOK
// =============================================================================
export const useModal = () => {
    const { state, dispatch } = useContext(DisplayContext);
    const { showToast } = useDisplay();

    const showModal = useCallback(
        (modal: TModalProps) => {
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

    const discardChanges = useCallback(() => {
        const successToast = {
            message: "Changes discarded.",
            type: EToastTypes.SUCCESS_TOAST,
        };
        dispatch({
            type: "hide-modal",
            payload: EModalType.DiscardChanges,
        });
        showToast(successToast);
    }, []);

    return {
        modals: state.modals,
        showModal,
        hideModal,
        discardChanges,
    };
};
