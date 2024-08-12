import { IContactField } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace ContactSchemaGenerator {
    export const elementToSchema = (element: IContactField) => {
        const baseSchema = generateBaseSchema(element);
        //TODO: Add validation for contact field once it's implemented
        const contactSchema = {
            [element.id]: {
                ...baseSchema,
                // Add additional validation if it exists
                // ...(additionalValidationSchema && {
                //     validation: [
                //         // Keep base validation
                //         ...(baseSchema.validation || []),
                //         ...additionalValidationSchema,
                //     ],
                // }),
            },
        };

        return contactSchema;
    };
}
