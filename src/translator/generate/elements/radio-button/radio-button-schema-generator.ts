import { IRadioButtonAttributes } from "src/context-providers";
import { generateBaseSchema } from "../../common";

export namespace RadioButtonSchemaGenerator {
    export const elementToSchema = (element: IRadioButtonAttributes) => {
        const baseSchema = generateBaseSchema(element);

        const radioButtonSchema = {
            [element.id]: {
                ...baseSchema,
                customOptions: {
                    indicator: true,
                    styleType: "toggle",
                },
                ...(element.placeholder && {
                    placeholder: element.placeholder,
                }),
                ...(element.radioItems && {
                    options: element.radioItems,
                }),
            },
        };

        return radioButtonSchema;
    };
}
