import { IContactFieldAttributes } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace ContactSchemaGenerator {
    export const elementToSchema = (element: IContactFieldAttributes) => {
        const baseSchema = generateBaseSchema(element);
        //TODO: Add validation for contact field once it's implemented
        const contactSchema = {
            [element.id]: {
                ...baseSchema,
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
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
