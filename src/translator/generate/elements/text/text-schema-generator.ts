import {
    EValidationType,
    ITextField,
    IValidation,
} from "src/context-providers";
import {
    createBaseSchema,
    createCustomRegexValidation,
    createMaxValidation,
    createMinValidation,
} from "../../common";
import { ISchemaValidation } from "../../types";

export namespace TextSchemaGenerator {
    const createTextAdditionalValidationSchema = (
        validation: IValidation[]
    ) => {
        if (validation.length === 0) return;

        const validationObj = validation.reduce<ISchemaValidation[]>(
            (acc, value) => {
                switch (value.validationType) {
                    case EValidationType.MAX_LENGTH:
                        acc.push(createMaxValidation(value));
                        break;
                    case EValidationType.MIN_LENGTH:
                        acc.push(createMinValidation(value));
                        break;
                    case EValidationType.CUSTOM_REGEX:
                        acc.push(createCustomRegexValidation(value));
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
        const baseSchema = createBaseSchema(element);
        const additionalValidationSchema = createTextAdditionalValidationSchema(
            element.validation
        );

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
