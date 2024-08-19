import { ISelectSchema } from "@lifesg/web-frontend-engine/components/fields";
import { isEmpty } from "lodash";
import { TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { parseBaseSchema } from "../../common";

export namespace DropdownSchemaParser {
    export const schemaToElement = (
        schema: ISelectSchema,
        id: string,
        prefill: IPrefillConfig,
        defaultValue: string | undefined
    ) => {
        const baseElement = parseBaseSchema(schema, id, prefill, defaultValue);
        const { options, placeholder } = schema;

        if (isEmpty(options) || options.length < 2) {
            throw new Error("Dropdown schema must have at least 2 options");
        }

        const parsedElement: TElement = {
            ...baseElement,
            placeholder: placeholder || "",
            dropdownItems: options,
        };

        return parsedElement;
    };
}
