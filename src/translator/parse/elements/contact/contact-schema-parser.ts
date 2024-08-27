import { IContactFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import { TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../../common";

export namespace ContactSchemaParser {
    export const schemaToElement = (
        schema: IContactFieldSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue?: string
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);
        const { placeholder } = schema;

        //TODO: Implement additional validation after contact field is implemented

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
        };

        return parsedElement;
    };
}
