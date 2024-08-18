import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { ITextareaSchema } from "@lifesg/web-frontend-engine/components/fields";
import {
    EValidationTypeFEE,
    IValidation,
    TElement,
} from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../..";
import { parseMaxLengthValidation } from "../../common";

export namespace LongTextSchemaParser {
    const parseLongTextValidation = (
        validation: IYupValidationRule[]
    ): IValidation[] => {
        const validationObj = validation.reduce<IValidation[]>((acc, value) => {
            Object.keys(value).forEach((key) => {
                switch (key) {
                    case EValidationTypeFEE.MAX:
                        acc.push(parseMaxLengthValidation(value));
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
        schema: ITextareaSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue: string | undefined
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);

        const { validation, placeholder } = schema;

        const additionalValidation: IYupValidationRule[] =
            validation?.filter(
                (rule) =>
                    !Object.prototype.hasOwnProperty.call(rule, "required")
            ) || [];

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            validation:
                (additionalValidation.length > 0 &&
                    parseLongTextValidation(additionalValidation)) ||
                [],
        };

        return parsedElement;
    };
}
