import { IDropdownAttributes } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace DropdownSchemaGenerator {
    export const elementToSchema = (element: IDropdownAttributes) => {
        const baseSchema = generateBaseSchema(element);

        const dropdownSchema = {
            [element.id]: {
                ...baseSchema,
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
                ...(element.dropdownItems && {
                    options: element.dropdownItems,
                }),
            },
        };

        return dropdownSchema;
    };
}
