import { TElement } from "src/context-providers/builder";
import { Translator } from "./translator";

export const elementToSchema = (element: TElement) => {
    const validation =
        Translator.textBasedField.createValidationObject(element);
    const textBasedFieldSchema = {
        [element.id]: {
            label: element.label,
            uiType: element.type,
            columns: {
                desktop: element.columns.desktop,
                tablet: element.columns.tablet,
                mobile: element.columns.mobile,
            },
            placeholder: element.placeholder,

            validation: validation,
        },
    };

    return textBasedFieldSchema;
};
