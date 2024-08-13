import {
    EValidationType,
    ITextField,
    IValidation,
} from "src/context-providers";
import {
    generateBaseSchema,
    generateCustomRegexValidation,
    generateMaxValidation,
    generateMinValidation,
} from "../../common";
import { ISchemaValidation } from "../../types";

export namespace TextSchemaGenerator {
    const generateTextAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) return;

        const validationObj = validation.reduce<ISchemaValidation[]>(
            (acc, value) => {
                switch (value.validationType) {
                    case EValidationType.MAX_LENGTH:
                        acc.push(generateMaxValidation(value));
                        break;
                    case EValidationType.MIN_LENGTH:
                        acc.push(generateMinValidation(value));
                        break;
                    case EValidationType.CUSTOM_REGEX:
                        acc.push(generateCustomRegexValidation(value));
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
    export const elementToSchema = (element: ITextField) => {
        const baseSchema = generateBaseSchema(element);
        const additionalValidationSchema =
            generateTextAdditionalValidationSchema(element.validation);

        const textSchema = {
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

        return textSchema;
    };
}
