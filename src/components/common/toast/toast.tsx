import { Toast } from "@lifesg/react-design-system/toast";
import { useEffect, useRef } from "react";
import { EToastTypes, IToast, useDisplay } from "src/context-providers";
import { ToastWrapper } from "./toast.styles";

interface IProps {
    toast?: IToast;
    toastFunction?: () => void;
    index?: number;
}

export const DisplayToast = ({ toast, toastFunction, index }: IProps) => {
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
        if (toast.id !== undefined) {
            timeoutRef.current = startDismissTimer(toast.id);

            return () => {
                clearTimeout(timeoutRef.current);
            };
        }
    }, [toast, dismissToast]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    const renderToast = () => {
        switch (toast.type) {
            case EToastTypes.SUCCESS_TOAST: {
                return (
                    <ToastWrapper
                        type={"success"}
                        label={toast.message}
                        autoDismiss
                        fixed={false}
                    />
                );
            }

            case EToastTypes.DELETE_TOAST: {
                return (
                    <>
                        <Toast
                            type={"success"}
                            label={toast.message}
                            autoDismiss
                            fixed={false}
                        />
                    </>
                );
            }
        }
    };

    return renderToast();
};
