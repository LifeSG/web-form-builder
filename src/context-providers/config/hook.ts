import { EElementLabel } from "src/data/elements-data";
import { useFormBuilderConfigContext } from "./form-builder-config";

export const useShouldShowField = (
    fieldName: string,
    elementName: EElementLabel
) => {
    const { elements, attributes } = useFormBuilderConfigContext();
    const elementConfig = elements?.[elementName];

    const shouldShow =
        elementConfig?.attributes?.[fieldName]?.shouldShow ??
        attributes?.[fieldName]?.shouldShow ??
        true;
    return shouldShow;
};
