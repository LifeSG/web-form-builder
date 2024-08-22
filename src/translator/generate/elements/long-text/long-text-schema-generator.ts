import { ITextarea, IValidation } from "src/context-providers";
import { generateBaseSchema, generateMaxValidation } from "../../common";

export namespace LongTextSchemaGenerator {
    const generateLongTextAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) {
            return;
        }
        return generateMaxValidation(validation[0]);
    };

    export const elementToSchema = (element: ITextarea) => {
        const baseSchema = generateBaseSchema(element);
        const additionalValidationSchema =
            generateLongTextAdditionalValidationSchema(element.validation);

        const longTextSchema = {
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
                        additionalValidationSchema,
                    ],
                }),
            },
        };

        return longTextSchema;
    };
}
