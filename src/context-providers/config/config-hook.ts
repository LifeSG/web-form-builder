import { useContext } from "react";
import { ConfigContext } from "./config-provider";

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    return context;
};

export const useShouldShowPrefill = () => {
    const { attributes } = useConfigContext();

    const shouldShow = attributes?.prefill?.shouldShow ?? true;

    return shouldShow;
};

export const usePresetForm = () => {
    const { presetForm } = useConfigContext();

    return presetForm;
};
