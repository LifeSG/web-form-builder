import { useDisplay } from "../../../context-providers";
import { DisplayToast } from "./toast";

export const Toasts = () => {
    const { toasts } = useDisplay();

    if (!toasts || toasts.length === 0) {
        return <></>;
    }

    return (
        <>
            {toasts.map((value) => (
                <DisplayToast
                    key={value.id}
                    toast={value}
                    toastFunction={value.toastFunction}
                />
            ))}
        </>
    );
};
