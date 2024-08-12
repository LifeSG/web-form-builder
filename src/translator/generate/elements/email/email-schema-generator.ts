import { IEmailField, IValidation } from "src/context-providers";
import { createBaseSchema } from "../../common/create-base-schema";

export namespace EmailSchemaGenerator {
    const createAdditionalValidationSchema = (validation: IValidation[]) => {
        if (validation.length === 0) return;

        const domainRegexString = (domains: IValidation) => {
            if (domains) {
                const domainsArr = domains?.validationRule.split(",");
                const generateSchemaDomains = domainsArr?.map((domain) =>
                    domain.trim().replace(/^@/, "").replace(/\./g, "\\.")
                );
                const regexPattern = `^[a-zA-Z0-9._%+-]+@(${generateSchemaDomains.join("|")})$`;
                return new RegExp(regexPattern);
            }
        };

        return {
            matches: domainRegexString(validation[0]).toString(),
            errorMessage: validation[0].validationErrorMessage,
        };
    };

    export const elementToSchema = (element: IEmailField) => {
        const baseSchema = createBaseSchema(element);
        const additionalValidationSchema = createAdditionalValidationSchema(
            element.validation
        );

        const emailSchema = {
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

        return emailSchema;
    };
}
