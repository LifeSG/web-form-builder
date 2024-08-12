import { IDropdown } from "src/context-providers";
import { createBaseSchema } from "../../common";

export namespace DropdownSchemaGenerator {
    export const elementToSchema = (element: IDropdown) => {
        const baseSchema = createBaseSchema(element);
        const filteredDropdownItems = element.dropdownItems.filter(
            (item) => item.label && item.value
        );

        const dropdownSchema = {
            [element.id]: {
                ...baseSchema,
                ...(filteredDropdownItems && {
                    options: filteredDropdownItems,
                }),
            },
        };

        return dropdownSchema;
    };
}
