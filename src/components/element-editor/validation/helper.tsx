import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";

// =============================================================================
// VALIDATION
// =============================================================================

const getFilteredValidationTypes = (
    validation: IValidation[],
    validationTypes: EValidationType[],
    ignoredTypes?: EValidationType[]
): string[] => {
    const hasType = (type: string) =>
        validation.some((val) => val.validationType === type);

    const filteredValidationTypes = validationTypes.filter(
        (type) => !hasType(type) || ignoredTypes?.includes(type)
    );

    return filteredValidationTypes;
};

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

            return getFilteredValidationTypes(validation, validationTypes, [
                EValidationType.CUSTOM_REGEX,
            ]);
        }

        case EElementType.NUMERIC:
            const validationTypes = [
                ...ELEMENT_VALIDATION_TYPES["Text field"][EElementType.NUMERIC]
                    .validationTypes,
            ];
            return getFilteredValidationTypes(validation, validationTypes);
        case EElementType.CONTACT:
            return ELEMENT_VALIDATION_TYPES["Text field"][EElementType.CONTACT]
                .validationTypes;
        default:
            return ["Select", "Type 1"];
    }
};
