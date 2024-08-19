import { IDropdown } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace DropdownSchemaGenerator {
    export const elementToSchema = (element: IDropdown) => {
        const baseSchema = generateBaseSchema(element);

        const dropdownSchema = {
            [element.id]: {
                ...baseSchema,
                ...(element.dropdownItems && {
                    options: element.dropdownItems,
                }),
            },
        };

        return dropdownSchema;
    };
}
