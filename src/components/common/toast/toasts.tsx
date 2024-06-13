import { ToastWrapper } from "src/form-builder.styles";
import { useDisplay } from "../../../context-providers";
import { DisplayToast } from "./toast";

export const Toasts: Function = () => {
    const { toasts } = useDisplay();

    return (
        <ToastWrapper>
            {toasts.map((toast) => (
                <DisplayToast
                    key={toast.id}
                    toast={toast}
                    onClickActionButton={toast.onClickActionButton}
                />
            ))}
        </ToastWrapper>
    );
};
