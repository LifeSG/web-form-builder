import { useDisplay } from "../../../context-providers";
import { DisplayToast } from "./toast";
import { ToastWrapper } from "./toasts.styles";

export const Toasts: Function = () => {
    const { toasts } = useDisplay();    
    return (
        <ToastWrapper>
            {toasts.map((toast) => (
                <DisplayToast
                    key={toast.id}
                    toast={toast}
                />
            ))}
        </ToastWrapper>
    );
};
