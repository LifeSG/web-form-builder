import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { IEmailFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import { EValidationType, TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { getAdditionalValidation, parseBaseSchema } from "../../common";

export namespace EmailSchemaParser {
    const parseEmailValidation = (validation: IYupValidationRule[]) => {
        const regexPattern = /@\((.*?)\)\$/;
        const match = validation[0].matches.toString().match(regexPattern);
        const extractedDomains = match[1]
            .split("|")
            .map((child) => child.replace(/\\./g, "."))
            .map((value) => {
                return "@" + value;
            })
            .join(", ");

        const DOMAIN_REGEX = /@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/;
        const isDomain = DOMAIN_REGEX.exec(extractedDomains);
        if (isDomain) {
            return [
                {
                    validationType: EValidationType.EMAIL_DOMAIN,
                    validationRule: extractedDomains,
                    validationErrorMessage: validation[0].errorMessage,
                },
            ];
        }
    };

    export const schemaToElement = (
        schema: IEmailFieldSchema,
        id: string,
        prefill: IPrefillConfig
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill);
        const { validation, placeholder } = schema;

        const additionalValidation = getAdditionalValidation(validation);

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            validation:
                (additionalValidation.length > 0 &&
                    parseEmailValidation(additionalValidation)) ||
                [],
        };

        return parsedElement;
    };
}
