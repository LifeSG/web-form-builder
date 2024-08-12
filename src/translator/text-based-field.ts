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
} from "src/context-providers";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import { parseConditionalRenderingObject, parsePrefillObject } from "./helper";
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
