import { EElementType, IValidation, TElement } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import {
    createConditionalRenderingObject,
    translateConditionalRenderingObject,
} from "./helper";

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

        export const translateEmailValidation = (
            validation: ISchemaValidation[]
        ) => {
            const regexPattern = /@\((.*?)\)\$/;
            const match = validation[0].matches.toString().match(regexPattern);
            const extractedDomains = match[1]
                .split("|")
                .map((child) => child.replace(/\\./g, "."))
                .map((value) => {
                    return "@" + value;
                })
                .join(", ");

            return [
                {
                    validationType:
                        ELEMENT_VALIDATION_TYPES["Text field"][
                            EElementType.EMAIL
                        ].validationTypes[0],
                    validationRule: extractedDomains,
                    validationErrorMessage: validation[0].errorMessage,
                },
            ];
        };
    }

    const createValidationObject = (element: TElement) => {
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

    export const translateValidationObject = (
        type: EElementType,
        validation: ISchemaValidation[]
    ) => {
        switch (type) {
            case EElementType.EMAIL:
                return Email.translateEmailValidation(validation);
            case EElementType.NUMERIC:
            case EElementType.TEXT:
            case EElementType.TEXTAREA:
            case EElementType.CONTACT:
            case EElementType.CHECKBOX:
            case EElementType.RADIO:
                return;
        }
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

    export const translateToElement = (schemaElements: {
        [key: string]: any;
    }) => {
        const translatedElements: TElement[] = [];

        Object.entries(schemaElements).forEach(([key, element]) => {
            const { showIf, uiType, validation, ...rest } = element;
            const remainingValidation =
                validation.length > 1 ? validation.slice(1) : [];

            translatedElements.push({
                ...rest,
                type: uiType,
                required: validation?.[0]?.required,
                requiredErrorMsg: validation?.[0]?.errorMessage,
                id: key,
                ...(remainingValidation.length > 0 && {
                    validation: translateValidationObject(
                        uiType,
                        remainingValidation
                    ),
                }),
                ...(showIf && {
                    conditionalRendering:
                        translateConditionalRenderingObject(showIf),
                }),
            });
        });

        return translatedElements;
    };
}
