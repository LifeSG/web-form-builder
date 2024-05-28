import { Toast } from "@lifesg/react-design-system/toast";
import { useEffect, useRef } from "react";
import { EToastTypes, IToast, useDisplay } from "src/context-providers";

interface IProps {
    toast: IToast;
    toastFunction?: () => void;
}

export const Toasts = ({ toast, toastFunction }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { dismissToast } = useDisplay();
    const timeoutRef = useRef(null);

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    function startDismissTimer(id: string) {
        return setTimeout(() => {
            dismissToast(id);
        }, 4500);
    }

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        timeoutRef.current = startDismissTimer(toast.id);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [toast, dismissToast]);

    // =============================================================================
    // RENDER
    // =============================================================================
    switch (toast.type) {
        case EToastTypes.SUCCESS_TOAST:
        case EToastTypes.DELETE_TOAST:
            return (
                <Toast
                    type={"success"}
                    label={toast.message}
                    autoDismiss
                    fixed={false}
                />
            );
        default:
            console.error("Unable to render toast required.");
            return null;
    }
};
