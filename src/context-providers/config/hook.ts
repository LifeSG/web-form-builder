import { useConfigContext } from "./config-hook";

export const useShouldShowPrefill = () => {
    const { attributes } = useConfigContext();

    const shouldShow = attributes?.prefill?.shouldShow ?? true;

    return shouldShow;
};
