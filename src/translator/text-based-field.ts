import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IComplexLabel,
    IEmailFieldSchema,
    INumericFieldSchema,
    ITextFieldSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    EValidationType,
    EValidationTypeFEE,
    IValidation,
    TElement,
    TTextBasedElement,
} from "src/context-providers";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import {
    createConditionalRenderingObject,
    parseConditionalRenderingObject,
    parsePrefillObject,
} from "./helper";
import { IPrefillConfig } from "./types";

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
                    const generateSchemaDomains = domainsArr?.map((domain) =>
                        domain.trim().replace(/^@/, "").replace(/\./g, "\\.")
                    );
                    const regexPattern = `^[a-zA-Z0-9._%+-]+@(${generateSchemaDomains.join("|")})$`;
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

            const DOMAIN_REGEX = /@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/;
            const isDomain = DOMAIN_REGEX.exec(extractedDomains);
            if (isDomain) {
                return [
                    {
                        validationType: EValidationType.EMAIL_DOMAIN,
                        validationRule: extractedDomains,
                        validationErrorMessage: validation[0].errorMessage,
                    },
                ];
            }
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

    export const parseTextBasedFieldValidation = (
        validation: IYupValidationRule[]
    ): IValidation[] => {
        const validationObj = validation.reduce<IValidation[]>((acc, value) => {
            Object.keys(value).forEach((key) => {
                switch (key) {
                    case EValidationTypeFEE.INTEGER:
                        acc.push({
                            validationType: EValidationType.WHOLE_NUMBERS,
                            validationErrorMessage: value.errorMessage,
                        });
                        break;
                    case EValidationTypeFEE.MAX:
                        acc.push({
                            validationType: EValidationType.MAX_VALUE,
                            validationRule: value.max.toString(),
                            validationErrorMessage: value.errorMessage,
                        });
                        break;
                    case EValidationTypeFEE.MIN:
                        acc.push({
                            validationType: EValidationType.MIN_VALUE,
                            validationRule: value.min.toString(),
                            validationErrorMessage: value.errorMessage,
                        });
                        break;
                    case EValidationTypeFEE.MATCHES:
                        acc.push({
                            validationType: EValidationType.CUSTOM_REGEX,
                            validationRule: value.matches,
                            validationErrorMessage: value.errorMessage,
                        });
                        break;
                    default:
                        break;
                }
            });
            return acc;
        }, []);
        return validationObj;
    };

    const createValidationObject = (element: TTextBasedElement) => {
        const validation: IYupValidationRule[] = [];

        if (element.required) {
            validation.push({
                required: element.required,
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
                return parseTextBasedFieldValidation(validation);
            case EElementType.CONTACT:
            case EElementType.CHECKBOX:
            case EElementType.RADIO:
                return;
        }
    };

    export const elementToSchema = (element: TTextBasedElement) => {
        const conditionalRenderingObject = createConditionalRenderingObject(
            element?.conditionalRendering
        );
        const validationObject = createValidationObject(element);
        const textBasedFieldSchema = {
            [element.id]: {
                label: {
                    mainLabel: element.label,
                    ...(element.description && {
                        subLabel: element.description,
                    }),
                },
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

    export const parseToElement = (
        element: TElementSchema,
        key: string,
        prefill: IPrefillConfig
    ) => {
        const { showIf, uiType, validation, label, ...rest } = element;

        let requiredValidation: IYupValidationRule = {};
        const fieldValidation = [];

        validation?.forEach((rule) => {
            if (Object.prototype.hasOwnProperty.call(rule, "required")) {
                requiredValidation = rule;
            } else {
                fieldValidation.push(rule);
            }
        });
        const newInternalId = SimpleIdGenerator.generate();

        const parsedElement = {
            ...rest,
            label: (label as IComplexLabel).mainLabel,
            description: (label as IComplexLabel).subLabel || "",
            type: uiType as EElementType,
            required: !!requiredValidation.required,
            requiredErrorMsg: requiredValidation.errorMessage || "",
            id: key,
            internalId: newInternalId,
            validation:
                (fieldValidation.length > 0 &&
                    parseValidationObject(
                        uiType as EElementType,
                        fieldValidation
                    )) ||
                [],
            conditionalRendering: showIf
                ? parseConditionalRenderingObject(showIf)
                : [],

            prefill: parsePrefillObject(prefill, key) || [],
        };

        return parsedElement as TElement;
    };
}
