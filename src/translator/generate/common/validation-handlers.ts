import { ValidationHandler } from "..";

export const createMaxValidation: ValidationHandler = (value) => ({
    max: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const createMinValidation: ValidationHandler = (value) => ({
    min: parseInt(value.validationRule),
    errorMessage: value.validationErrorMessage,
});

export const createWholeNumberValidation: ValidationHandler = (value) => ({
    integer: true,
    errorMessage: value.validationErrorMessage,
});

export const createCustomRegexValidation: ValidationHandler = (value) => ({
    matches: value.validationRule,
    errorMessage: value.validationErrorMessage,
});
