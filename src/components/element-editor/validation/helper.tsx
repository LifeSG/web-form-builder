import { EElementType, IValidation } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";

// =============================================================================
// VALIDATION
// =============================================================================

export const getValidationOptionsByType = (
    validation: IValidation[],
    elementType: EElementType
) => {
    switch (elementType) {
        case EElementType.EMAIL:
        case EElementType.TEXTAREA:
            return ELEMENT_VALIDATION_TYPES["Text field"][elementType]
                .validationTypes;

        case EElementType.TEXT: {
            const validationTypes = [
                ...ELEMENT_VALIDATION_TYPES["Text field"][EElementType.TEXT]
                    .validationTypes,
            ];

            const hasMinLength = validation.some(
                (val) => val.validationType === validationTypes[1]
            );
            const hasMaxLength = validation.some(
                (val) => val.validationType === validationTypes[2]
            );

            const filteredValidationTypes = validationTypes.filter(
                (validation) =>
                    (validation !== validationTypes[1] || !hasMinLength) &&
                    (validation !== validationTypes[2] || !hasMaxLength)
            );
            return filteredValidationTypes;
        }
        default:
            return ["Select", "Type 1"];
    }
};
