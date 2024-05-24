import { useDisplay } from "../../../context-providers";
import { DisplayToast } from "./toast";

export const RenderToasts = () => {
    const { toast } = useDisplay();

    if (!toast || toast.length === 0) {
        return <></>;
    }

    return (
        <>
            {toast.map((value) => (
                <DisplayToast
                    key={value.id}
                    toast={value}
                    toastFunction={value.toastFunction}
                />
            ))}
        </>
    );
};
