import { IDropdown } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace DropdownSchemaGenerator {
    export const elementToSchema = (element: IDropdown) => {
        const baseSchema = generateBaseSchema(element);
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
