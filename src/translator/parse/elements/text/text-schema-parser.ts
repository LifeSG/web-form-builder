import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { ITextFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EValidationTypeFEE,
    IValidation,
    TElement,
} from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../..";
import {
    parseMatchesValidation,
    parseMaxLengthValidation,
    parseMinLengthValidation,
} from "../../common/validation-schema-parsers";

export namespace TextSchemaParser {
    const parseTextValidation = (
        validation: IYupValidationRule[]
    ): IValidation[] => {
        const validationObj = validation.reduce<IValidation[]>((acc, value) => {
            Object.keys(value).forEach((key) => {
                switch (key) {
                    case EValidationTypeFEE.MAX:
                        acc.push(parseMaxLengthValidation(value));
                        break;
                    case EValidationTypeFEE.MIN:
                        acc.push(parseMinLengthValidation(value));
                        break;
                    case EValidationTypeFEE.MATCHES:
                        acc.push(parseMatchesValidation(value));
                        break;
                    default:
                        break;
                }
            });
            return acc;
        }, []);
        return validationObj;
    };

    export const schemaToElement = (
        schema: ITextFieldSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue: string | undefined
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);

        const { validation } = schema;

        const additionalValidation: IYupValidationRule[] =
            validation?.filter(
                (rule) =>
                    !Object.prototype.hasOwnProperty.call(rule, "required")
            ) || [];

        const parsedElement: TElement = {
            ...baseElement,
            validation:
                (additionalValidation.length > 0 &&
                    parseTextValidation(additionalValidation)) ||
                [],
        };

        return parsedElement;
    };
}
