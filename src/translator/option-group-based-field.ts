import { TElement } from "src/context-providers";
import { createConditionalRenderingObject } from "./helper";

export namespace OptionGroupBasedField {
    export interface ISchemaValidation {
        [key: string]: string | boolean;
        errorMessage?: string;
    }

    export const elementToSchema = (element: TElement) => {
        const conditionalRenderingObject = createConditionalRenderingObject(
            element?.conditionalRendering
        );

        const filteredDropdownItems =
            "dropdownItems" in element
                ? element.dropdownItems.filter(
                      (item) => item.label && item.value
                  )
                : undefined;

        const optionGroupBasedFieldSchema = {
            [element.id]: {
                label: element.label,
                uiType: element.type,
                columns: {
                    desktop: element.columns.desktop,
                    tablet: element.columns.tablet,
                    mobile: element.columns.mobile,
                },
                ...(element.required && {
                    validation: [
                        {
                            required: true,
                            ...(element.requiredErrorMsg && {
                                errorMessage: element.requiredErrorMsg,
                            }),
                        },
                    ],
                }),
                ...(filteredDropdownItems && {
                    options: filteredDropdownItems,
                }),
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
                ...(conditionalRenderingObject && {
                    showIf: conditionalRenderingObject,
                }),
            },
        };
        return optionGroupBasedFieldSchema;
    };
}
