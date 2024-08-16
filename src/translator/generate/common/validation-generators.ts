import { ValidationGenerator } from "../types";

export const generateMaxValidation: ValidationGenerator = (value) => ({
    max: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const generateMinValidation: ValidationGenerator = (value) => ({
    min: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const generateWholeNumberValidation: ValidationGenerator = (value) => ({
    integer: true,
    errorMessage: value.validationErrorMessage,
});

export const generateCustomRegexValidation: ValidationGenerator = (value) => ({
    matches: value.validationRule,
    errorMessage: value.validationErrorMessage,
});
