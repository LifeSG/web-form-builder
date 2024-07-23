import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IEmailFieldSchema,
    INumericFieldSchema,
    ITextFieldSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import {
    EElementType,
    EValidationType,
    IValidation,
    TElement,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import {
    createConditionalRenderingObject,
    parseConditionalRenderingObject,
} from "./helper";

export namespace TextBasedField {
    export type TElementSchema =
        | ITextFieldSchema
        | IEmailFieldSchema
        | INumericFieldSchema;

    export interface ISchemaValidation {
        [key: string]: string | number | boolean;
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

        export const parseEmailValidation = (
            validation: IYupValidationRule[]
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

    const createTextFieldValidationSchema = (validation: IValidation[]) => {
        const validationObj = validation.reduce<ISchemaValidation[]>(
            (acc, value) => {
                switch (value.validationType) {
                    case EValidationType.MAX_VALUE:
                    case EValidationType.MAX_LENGTH:
                        acc.push({
                            max: parseInt(value.validationRule),
                            errorMessage: value.validationErrorMessage,
                        });
                        break;
                    case EValidationType.MIN_VALUE:
                    case EValidationType.MIN_LENGTH:
                        acc.push({
                            min: parseInt(value.validationRule),
                            errorMessage: value.validationErrorMessage,
                        });
                        break;
                    case EValidationType.WHOLE_NUMBERS:
                        acc.push({
                            integer: true,
                            errorMessage: value.validationErrorMessage,
                        });
                        break;
                    case EValidationType.CUSTOM_REGEX:
                        acc.push({
                            matches: value.validationRule,
                            errorMessage: value.validationErrorMessage,
                        });
                        break;
                    default:
                        break;
                }
                return acc;
            },
            []
        );
        return validationObj;
    };

    const createValidationObject = (element: TElement) => {
        const validation: IYupValidationRule[] = [];

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
                case EElementType.NUMERIC: {
                    const validationChild = createTextFieldValidationSchema(
                        element.validation
                    );
                    validation.push(...validationChild);
                    break;
                }
                case EElementType.CHECKBOX:
                case EElementType.RADIO:
                    break;
            }
        }

        if (validation.length === 0) return;

        return validation;
    };

    export const parseValidationObject = (
        type: EElementType,
        validation: IYupValidationRule[]
    ) => {
        switch (type) {
            case EElementType.EMAIL:
                return Email.parseEmailValidation(validation);
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

    export const parseToElement = (element: TElementSchema, key: string) => {
        const { showIf, uiType, validation, ...rest } = element;

        let requiredValidation: IYupValidationRule = {};
        const fieldValidation = [];

        validation.forEach((rule) => {
            if (Object.prototype.hasOwnProperty.call(rule, "required")) {
                requiredValidation = rule;
            } else {
                fieldValidation.push(rule);
            }
        });
        const newInternalId = SimpleIdGenerator.generate();

        const parsedElement = {
            ...rest,
            type: uiType as EElementType,
            required: requiredValidation.required as boolean,
            requiredErrorMsg: requiredValidation.errorMessage,
            id: key,
            internalId: newInternalId,
            ...(fieldValidation.length > 0 && {
                validation: parseValidationObject(
                    uiType as EElementType,
                    fieldValidation
                ),
            }),
            ...(showIf && {
                conditionalRendering: parseConditionalRenderingObject(
                    showIf as TRenderRules[]
                ),
            }),
        };

        return parsedElement as TElement;
    };
}
