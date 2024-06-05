import { useDisplay } from "../../../context-providers";
import { DisplayToast } from "./toast";

export const Toasts = () => {
    const { toasts } = useDisplay();

    return (
        <>
            {toasts.map((toast) => (
                <DisplayToast
                    key={toast.id}
                    toast={toast}
                    toastFunction={toast.toastFunction}
                />
            ))}
        </>
    );
};
