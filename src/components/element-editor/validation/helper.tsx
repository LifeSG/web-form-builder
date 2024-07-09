import { EElementType, IValidation } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { Form } from "@lifesg/react-design-system/form";

// =============================================================================
// VALIDATION
// =============================================================================
export function getOptionsByType(
    validation: IValidation[],
    elementType: EElementType
) {
    switch (elementType) {
        case EElementType.EMAIL:
            return ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
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
}

// =============================================================================
// VALIDATION CHILD
// =============================================================================
export const renderValidationRule = (
    fieldWithoutRef: any,
    index: number,
    validationType: string,
    validationRulePlaceHolder?: string,
    errors?: any
) => {
    switch (validationType) {
        case ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
            .validationTypes[0]:
            return (
                <Form.Textarea
                    {...fieldWithoutRef}
                    placeholder={validationRulePlaceHolder || "Enter rule"}
                    value={fieldWithoutRef.value}
                    onChange={(event) => {
                        fieldWithoutRef.onChange(event.target.value);
                    }}
                    errorMessage={
                        errors?.validation?.[index]?.validationRule?.message
                    }
                />
            );
        default:
            return (
                <Form.Input
                    {...fieldWithoutRef}
                    placeholder={"Enter rule"}
                    value={fieldWithoutRef.value}
                    onChange={(event) => {
                        fieldWithoutRef.onChange(event.target.value);
                    }}
                    errorMessage={
                        errors?.validation?.[index]?.validationRule?.message
                    }
                />
            );
    }
};
