import { TRadioButtonGroupSchema } from "@lifesg/web-frontend-engine/components/fields";
import isEmpty from "lodash/isEmpty";
import { IOptionAttributes, TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../../common";

export namespace RadioSchemaParser {
    export const schemaToElement = (
        schema: TRadioButtonGroupSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue?: string
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);
        const { options, placeholder } = schema;

        if (isEmpty(options) || options.length < 2) {
            throw new Error("Radio button schema must have at least 2 options");
        }

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            radioItems: options as IOptionAttributes[],
        };

        return parsedElement;
    };
}
