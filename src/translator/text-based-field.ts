import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IComplexLabel,
    IEmailFieldSchema,
    INumericFieldSchema,
    ITextFieldSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import { EElementType, IValidation, TElement } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
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
                        validationType:
                            ELEMENT_VALIDATION_TYPES["Text field"][
                                EElementType.EMAIL
                            ].validationTypes[0],
                        validationRule: extractedDomains,
                        validationErrorMessage: validation[0].errorMessage,
                    },
                ];
            }
        };
    }

    const createValidationObject = (element: TElement) => {
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
            description: (label as IComplexLabel).subLabel,
            type: uiType as EElementType,
            required: !!requiredValidation.required,
            requiredErrorMsg: requiredValidation.errorMessage,
            id: key,
            internalId: newInternalId,
            ...(fieldValidation.length > 0 && {
                validation: parseValidationObject(
                    uiType as EElementType,
                    fieldValidation
                ),
            }),
            conditionalRendering: showIf
                ? parseConditionalRenderingObject(showIf)
                : [],

            prefill: parsePrefillObject(prefill, key) || [],
        };

        return parsedElement as TElement;
    };
}
