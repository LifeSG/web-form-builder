import { ISelectSchema } from "@lifesg/web-frontend-engine/components/fields";
import { TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../../common";

export namespace DropdownSchemaParser {
    export const schemaToElement = (
        schema: ISelectSchema,
        id: string,
        prefill: IPrefillConfig
    ) => {
        const { options, placeholder } = schema;
        const baseElement = parseBaseSchema(schema, id, prefill);

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            dropdownItems: options,
        };

        return parsedElement;
    };
}
