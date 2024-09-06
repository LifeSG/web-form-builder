import { useConfigContext } from "./config-hook";

export const useShouldShowPrefill = () => {
    const { sections } = useConfigContext();

    const shouldShow = sections?.prefill?.shouldShow ?? true;

    return shouldShow;
};
