import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { IEmailFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EValidationType,
    EValidationTypeFEE,
    TElement,
} from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { getAdditionalValidation, parseBaseSchema } from "../../common";

export namespace EmailSchemaParser {
    const parseEmailValidation = (validation: IYupValidationRule[]) => {
        const matchesValidation = validation.find((obj) =>
            Object.prototype.hasOwnProperty.call(
                obj,
                EValidationTypeFEE.MATCHES
            )
        );
        if (!matchesValidation) {
            return;
        }
        const regexPattern = /@\((.*?)\)\$/;
        const match = matchesValidation.matches.toString().match(regexPattern);
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
                    validationErrorMessage: matchesValidation.errorMessage,
                },
            ];
        }
    };

    export const schemaToElement = (
        schema: IEmailFieldSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue?: string
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);
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
