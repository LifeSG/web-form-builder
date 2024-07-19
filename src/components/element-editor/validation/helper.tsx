import { EElementType, IValidation } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";

// =============================================================================
// VALIDATION
// =============================================================================

export const getValidationOptionsByType = (
    validation: IValidation[],
    elementType: EElementType
) => {
    const getFilteredValidationTypes = (
        validation: IValidation[],
        validationTypes: string[],
        ignoredTypes?: string[]
    ): string[] => {
        const hasType = (type: string) =>
            validation.some((val) => val.validationType === type);

        const filteredValidationTypes = validationTypes.filter(
            (type) => !hasType(type) || ignoredTypes?.includes(type)
        );

        return filteredValidationTypes;
    };

    switch (elementType) {
        case EElementType.EMAIL:
            return ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
                .validationTypes;

        case EElementType.TEXT: {
            const validationTypes = [
                ...ELEMENT_VALIDATION_TYPES["Text field"][EElementType.TEXT]
                    .validationTypes,
            ];

            return getFilteredValidationTypes(validation, validationTypes, [
                validationTypes[0],
            ]);
        }

        case EElementType.NUMERIC:
            const validationTypes = [
                ...ELEMENT_VALIDATION_TYPES["Text field"][EElementType.NUMERIC]
                    .validationTypes,
            ];
            return getFilteredValidationTypes(validation, validationTypes);
        default:
            return ["Select", "Type 1"];
    }
};
