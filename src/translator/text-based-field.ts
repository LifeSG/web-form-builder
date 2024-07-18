import {
    EElementType,
    IValidation,
    TTextBasedElement,
} from "src/context-providers";
import { createConditionalRenderingObject } from "./helper";

export namespace TextBasedField {
    export interface ISchemaValidation {
        [key: string]: string | boolean;
        errorMessage?: string;
    }

    namespace Email {
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

    const createValidationObject = (element: TTextBasedElement) => {
        if (!element) return;

        const validation: ISchemaValidation[] = [];

        if (element.required) {
            validation.push({
                required: true,
                ...(element.requiredErrorMsg && {
                    errorMessage: element.requiredErrorMsg,
                }),
            });
        }

        if (element.validation && element.validation.length > 0) {
            switch (element.type) {
                case EElementType.EMAIL: {
                    const validationChild = Email.createEmailValidationSchema(
                        element.validation[0]
                    );
                    validation.push(validationChild);
                    break;
                }
                case EElementType.TEXT:
                case EElementType.TEXTAREA:
                case EElementType.CONTACT:
                case EElementType.NUMERIC:
                    break;
                case EElementType.CHECKBOX:
                case EElementType.RADIO:
                    break;
            }
        }

        if (validation.length === 0) return;

        return validation;
    };

    export const elementToSchema = (element: TTextBasedElement) => {
        const conditionalRenderingObject = createConditionalRenderingObject(
            element?.conditionalRendering
        );
        const validationObject = createValidationObject(element);
        const textBasedFieldSchema = {
            [element.id]: {
                label: element.label,
                uiType: element.type,
                columns: {
                    desktop: element.columns.desktop,
                    tablet: element.columns.tablet,
                    mobile: element.columns.mobile,
                },
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
                ...(validationObject && { validation: validationObject }),
                ...(conditionalRenderingObject && {
                    showIf: conditionalRenderingObject,
                }),
            },
        };

        return textBasedFieldSchema;
    };
}
