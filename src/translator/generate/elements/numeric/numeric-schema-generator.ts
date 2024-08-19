import {
    EValidationType,
    INumericField,
    IValidation,
} from "src/context-providers";
import {
    generateBaseSchema,
    generateMaxValidation,
    generateMinValidation,
    generateWholeNumberValidation,
} from "../../common";
import { ISchemaValidation } from "../../types";

export namespace NumericSchemaGenerator {
    const generateNumericAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) return;
        const validationObj = validation.reduce<ISchemaValidation[]>(
            (acc, value) => {
                switch (value.validationType) {
                    case EValidationType.MAX_VALUE:
                        acc.push(generateMaxValidation(value));
                        break;
                    case EValidationType.MIN_VALUE:
                        acc.push(generateMinValidation(value));
                        break;
                    case EValidationType.WHOLE_NUMBERS:
                        acc.push(generateWholeNumberValidation(value));
                        break;
                    default:
                        break;
                }
                return acc;
            },
            []
        );
        return validationObj;
    };

    export const elementToSchema = (element: INumericField) => {
        const baseSchema = generateBaseSchema(element);
        const additionalValidationSchema =
            generateNumericAdditionalValidationSchema(element.validation);

        const numericSchema = {
            [element.id]: {
                ...baseSchema,
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
                // Add additional validation if it exists
                ...(additionalValidationSchema && {
                    validation: [
                        // Keep base validation
                        ...(baseSchema.validation || []),
                        ...additionalValidationSchema,
                    ],
                }),
            },
        };

        return numericSchema;
    };
}
