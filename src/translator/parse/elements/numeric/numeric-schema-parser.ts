import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { INumericFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EValidationTypeFEE,
    IValidation,
    TElement,
} from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../..";
import {
    parseIntegerValidation,
    parseMaxValueValidation,
    parseMinValueValidation,
} from "../../common/validation-schema-parsers";

export namespace NumericSchemaParser {
    const parseNumericValidation = (
        validation: IYupValidationRule[]
    ): IValidation[] => {
        const validationObj = validation.reduce<IValidation[]>((acc, value) => {
            Object.keys(value).forEach((key) => {
                switch (key) {
                    case EValidationTypeFEE.MAX:
                        acc.push(parseMaxValueValidation(value));
                        break;
                    case EValidationTypeFEE.MIN:
                        acc.push(parseMinValueValidation(value));
                        break;
                    case EValidationTypeFEE.INTEGER:
                        acc.push(parseIntegerValidation(value));
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
        schema: INumericFieldSchema,
        id: string,
        prefill: IPrefillConfig
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill);

        const { validation } = schema;

        const additionalValidation: IYupValidationRule[] =
            validation?.filter(
                (rule) =>
                    !Object.prototype.hasOwnProperty.call(rule, "required")
            ) || [];

        const parsedElement = {
            ...baseElement,
            validation:
                (additionalValidation.length > 0 &&
                    parseNumericValidation(additionalValidation)) ||
                [],
        };

        return parsedElement as TElement;
    };
}
