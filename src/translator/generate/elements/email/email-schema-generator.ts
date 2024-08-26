import { IEmailFieldAttributes, IValidation } from "src/context-providers";
import { generateBaseSchema } from "../../common/generate-base-schema";

export namespace EmailSchemaGenerator {
    const generateAdditionalValidationSchema = (validation: IValidation[]) => {
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

    export const elementToSchema = (element: IEmailFieldAttributes) => {
        const baseSchema = generateBaseSchema(element);
        const additionalValidationSchema = generateAdditionalValidationSchema(
            element.validation
        );

        const emailSchema = {
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

        return emailSchema;
    };
}
