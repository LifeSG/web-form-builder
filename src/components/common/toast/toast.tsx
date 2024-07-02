import { Toast } from "@lifesg/react-design-system/toast";
import { EToastTypes, IToast, useDisplay } from "src/context-providers";

interface IProps {
    toast: IToast;
    onClickActionButton?: () => void;
}

export const DisplayToast = ({ toast, onClickActionButton }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { dismissToast } = useDisplay();

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
                    fixed={false}
                    onDismiss={() => handleDismissToast(toast.id)}
                    actionButton={{
                        label: "Undo",
                        onClick: onClickActionButton,
                    }}
                />
            );
        default:
            console.error("Unable to render toast required.");
            return null;
    }
};
