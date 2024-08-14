import { ISelectSchema } from "@lifesg/web-frontend-engine/components/fields";
import { TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../..";

export namespace DropdownSchemaParser {
    export const schemaToElement = (
        schema: ISelectSchema,
        id: string,
        prefill: IPrefillConfig
    ) => {
        const { options } = schema;
        const baseElement = parseBaseSchema(schema, id, prefill);

        const parsedElement: TElement = {
            ...baseElement,
            dropdownItems: options,
        };

        return parsedElement;
    };
}
