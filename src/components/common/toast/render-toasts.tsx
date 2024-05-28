import { useDisplay } from "../../../context-providers";
import { Toasts } from "./toasts";

export const RenderToasts = () => {
    const { toasts } = useDisplay();

    if (!toasts || toasts.length === 0) {
        return <></>;
    }

    return (
        <>
            {toasts.map((value) => (
                <Toasts
                    key={value.id}
                    toast={value}
                    toastFunction={value.toastFunction}
                />
            ))}
        </>
    );
};
