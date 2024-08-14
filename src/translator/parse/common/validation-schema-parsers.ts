import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { EValidationType } from "src/context-providers";
import { ValidationSchemaParser } from "../types";

export const parseMinValueValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.MIN_VALUE,
        validationRule: validationSchema.min.toString(),
        validationErrorMessage: validationSchema.errorMessage,
    };
};

export const parseMaxValueValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.MAX_VALUE,
        validationRule: validationSchema.max.toString(),
        validationErrorMessage: validationSchema.errorMessage,
    };
};

export const parseMinLengthValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.MIN_LENGTH,
        validationRule: validationSchema.min.toString(),
        validationErrorMessage: validationSchema.errorMessage,
    };
};

export const parseMaxLengthValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.MAX_LENGTH,
        validationRule: validationSchema.max.toString(),
        validationErrorMessage: validationSchema.errorMessage,
    };
};

export const parseMatchesValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.CUSTOM_REGEX,
        validationRule: validationSchema.matches,
        validationErrorMessage: validationSchema.errorMessage,
    };
};

export const parseIntegerValidation: ValidationSchemaParser = (
    validationSchema: IYupValidationRule
) => {
    return {
        validationType: EValidationType.WHOLE_NUMBERS,
        validationErrorMessage: validationSchema.errorMessage,
    };
};
