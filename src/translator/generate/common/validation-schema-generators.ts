import { ValidationSchemaGenerator } from "..";

export const generateMaxValidation: ValidationSchemaGenerator = (value) => ({
    max: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const generateMinValidation: ValidationSchemaGenerator = (value) => ({
    min: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const generateWholeNumberValidation: ValidationSchemaGenerator = (
    value
) => ({
    integer: true,
    errorMessage: value.validationErrorMessage,
});

export const generateCustomRegexValidation: ValidationSchemaGenerator = (
    value
) => ({
    matches: value.validationRule,
    errorMessage: value.validationErrorMessage,
});
