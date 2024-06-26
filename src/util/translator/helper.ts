import { TElement } from "src/context-providers/builder";

export interface ISchemaValidation {
    [key: string]: string | boolean;
    errorMessage: string;
}
const createValidationObject = (element: TElement) => {
    const validation: ISchemaValidation[] = [
        {
            required: element.required,
            errorMessage: element.requiredErrorMsg,
        },
    ];
    return validation;
};

export const elementToSchema = (element: TElement) => {
    const validation = createValidationObject(element);
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
