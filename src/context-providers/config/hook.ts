import { EElementLabel } from "src/data/elements-data";
import { useConfigContext } from "./config-hook";

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
