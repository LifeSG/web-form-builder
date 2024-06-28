import { EElementType, IValidation, TElement } from "src/context-providers";
import { createConditionalRenderingObject } from "./helper";

export namespace textBasedField {
    export namespace email {
        export interface ISchemaValidation {
            [key: string]: string | boolean;
            errorMessage: string;
        }
        export const createEmailValidationSchema = (
            validation: IValidation
        ) => {
            const domainRegexString = (domains: IValidation) => {
                if (domains) {
                    const domainsArr = domains?.validationRule.split(",");
                    const translatedDomains = domainsArr?.map((domain) =>
                        domain.trim().replace(/^@/, "").replace(/\./g, "\\.")
                    );
                    const regexPattern = `^[a-zA-Z0-9._%+-]+@(${translatedDomains.join("|")})$`;
                    return new RegExp(regexPattern);
                }
            };

            return {
                matches: domainRegexString(validation).toString(),
                errorMessage: validation.validationErrorMessage,
            };
        };
    }

    export const createValidationObject = (element: TElement) => {
        const validation: email.ISchemaValidation[] = [
            {
                required: element.required,
                errorMessage: element.requiredErrorMsg,
            },
        ];
        if (element?.validation?.length > 0) {
            switch (element.type) {
                case EElementType.EMAIL: {
                    const validationChild = email.createEmailValidationSchema(
                        element.validation?.[0]
                    );
                    validation.push(validationChild);
                    break;
                }

                case EElementType.TEXT:
                case EElementType.TEXTAREA:
                case EElementType.CONTACT:
                case EElementType.NUMERIC: {
                    break;
                }

                case EElementType.CHECKBOX:
                case EElementType.RADIO: {
                    break;
                }
            }
        }

        return validation;
    };

    export const elementToSchema = (element: TElement) => {
        const conditionalRenderingObject = createConditionalRenderingObject(
            element?.conditionalRendering
        );
        const validationObject = createValidationObject(element);
        const textBasedFieldSchema = {
            [element.id]: {
                label: element.label,
                uiType: element.type,
                columns: {
                    desktop: element.columns,
                },
                placeholder: element.placeholder,
                validation: validationObject,
                ...(conditionalRenderingObject.length > 0 && {
                    showIf: conditionalRenderingObject,
                }),
            },
        };

        return textBasedFieldSchema;
    };
}
