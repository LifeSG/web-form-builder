import {
    EValidationType,
    INumericField,
    IValidation,
} from "src/context-providers";
import { ISchemaValidation } from "../..";
import {
    createBaseSchema,
    createMaxValidation,
    createMinValidation,
    createWholeNumberValidation,
} from "../../common";

export namespace NumericSchemaGenerator {
    const createNumericAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) return;
        const validationObj = validation.reduce<ISchemaValidation[]>(
            (acc, value) => {
                switch (value.validationType) {
                    case EValidationType.MAX_VALUE:
                        acc.push(createMaxValidation(value));
                        break;
                    case EValidationType.MIN_VALUE:
                        acc.push(createMinValidation(value));
                        break;
                    case EValidationType.WHOLE_NUMBERS:
                        acc.push(createWholeNumberValidation(value));
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
        const baseSchema = createBaseSchema(element);
        const additionalValidationSchema =
            createNumericAdditionalValidationSchema(element.validation);

        const numericSchema = {
            [element.id]: {
                ...baseSchema,
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
