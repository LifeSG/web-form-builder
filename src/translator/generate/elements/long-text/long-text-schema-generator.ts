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

        const resizableAreaInput = element.resizableInput;

        // If pills is true, there must be at least 2 pill items
        const pillItems = element.pillItems?.map((item) => item.content);

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
                ...(resizableAreaInput && { resizable: true }),
                ...(element.pills && { chipTexts: pillItems }),
                ...(element.pills &&
                    element.pillPosition === "bottom" && {
                        chipPosition: element.pillPosition,
                    }),
            },
        };

        return longTextSchema;
    };
}
