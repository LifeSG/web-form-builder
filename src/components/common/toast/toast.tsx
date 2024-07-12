import { Toast } from "@lifesg/react-design-system/toast";
import {
    EToastTypes,
    IToast,
    useBuilder,
    useDisplay,
} from "src/context-providers";

interface IProps {
    toast: IToast;
}

export const DisplayToast = ({ toast }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { dismissToast, showToast } = useDisplay();
    const { undoDeleteElement } = useBuilder();

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const handleDismissToast = (id: string) => {
        dismissToast(id);
    };

    const handleUndoDeleteElementClick = () => {
        undoDeleteElement(toast.elementInternalId);
        handleDismissToast(toast.id);
        const revertedToast: IToast = {
            ...toast,
            type: EToastTypes.SUCCESS_TOAST,
            message: "Deleted element reverted.",
        };
        showToast(revertedToast);
    };

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
        case EToastTypes.DELETE_ELEMENT_TOAST:
            return (
                <Toast
                    type={"success"}
                    label={toast.message}
                    autoDismiss
                    autoDismissTime={7000}
                    fixed={false}
                    onDismiss={() => handleDismissToast(toast.id)}
                    actionButton={{
                        label: "Undo",
                        onClick: handleUndoDeleteElementClick,
                    }}
                />
            );
        default:
            console.error("Unable to render toast required.");
            return null;
    }
};
