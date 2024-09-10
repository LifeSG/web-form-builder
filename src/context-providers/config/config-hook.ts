import { useContext } from "react";
import { EElementLabel } from "src/data";
import { ConfigContext } from "./config-provider";

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    return context;
};

export const useShouldShowField = (
    fieldName: string,
    elementName: EElementLabel
) => {
    const { elements, attributes } = useConfigContext();
    const elementConfig = elements?.[elementName];

    const shouldShow =
        elementConfig?.attributes?.[fieldName]?.shouldShow ??
        attributes?.[fieldName]?.shouldShow ??
        true;
    return shouldShow;
};

export const useShouldShowPrefill = () => {
    const { attributes } = useConfigContext();

    const shouldShow = attributes?.prefill?.shouldShow ?? true;

    return shouldShow;
};
