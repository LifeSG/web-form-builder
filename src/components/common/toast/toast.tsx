import { Toast } from "@lifesg/react-design-system/toast";
import { useContext } from "react";
import { BuilderContext, EToastTypes, IToast, useBuilder, useDisplay } from "src/context-providers";

interface IProps {
    toast: IToast;
    onClickActionButton?: () => void;
}

export const DisplayToast = ({ toast, onClickActionButton }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { dismissToast } = useDisplay();
    const { undoDeleteElement } = useBuilder();

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    function handleDismissToast(id: string) {
        dismissToast(id);
    }

    // =============================================================================
    // RENDER
    // =============================================================================
    switch (toast.type) {
        case EToastTypes.SUCCESS_TOAST:
            return (
                <Toast
                    type={"success"}
                    label={toast.message}
                    autoDismiss
                    fixed={false}
                    onDismiss={() => handleDismissToast(toast.id)}
                />
            );
        case EToastTypes.DELETE_TOAST:
            return (
                <Toast
                    type={"success"}
                    label={toast.message}
                    autoDismiss
                    autoDismissTime={10000}
                    fixed={false}
                    onDismiss={() => handleDismissToast(toast.id)}
                    actionButton={{
                        label: "Undo",
                        onClick: () => {
                            undoDeleteElement(toast.elementInternalId);
                        },
                    }}
                />
            );
        default:
            console.error("Unable to render toast required.");
            return null;
    }
};
