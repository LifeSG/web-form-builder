import { ITextarea, IValidation } from "src/context-providers";
import { createBaseSchema, createMaxValidation } from "../../common";

export namespace LongTextSchemaGenerator {
    const createLongTextAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) {
            return;
        }
        return createMaxValidation(validation[0]);
    };

    export const elementToSchema = (element: ITextarea) => {
        const baseSchema = createBaseSchema(element);
        const additionalValidationSchema =
            createLongTextAdditionalValidationSchema(element.validation);

        const longTextSchema = {
            [element.id]: {
                ...baseSchema,
                // Add additional validation if it exists
                ...(additionalValidationSchema && {
                    validation: [
                        // Keep base validation
                        ...(baseSchema.validation || []),
                        additionalValidationSchema,
                    ],
                }),
            },
        };

        return longTextSchema;
    };
}
