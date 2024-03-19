import { EElementType } from "src/schemas";

interface IElementCategoryAttributes {
    categoryTitle: string;
    elementTypes: EElementType[];
}

export const ELEMENTS_CATEGORIES = new Map<string, IElementCategoryAttributes>([
    [
        "textual",
        {
            categoryTitle: "Text field",
            elementTypes: [
                EElementType.EMAIL,
                EElementType.TEXT,
                EElementType.TEXTAREA,
                EElementType.NUMERIC,
                EElementType.CONTACT,
            ],
        },
    ],
    // NOTE: Added for testing. Not needed for now
    // [
    //     "options",
    //     {
    //         categoryTitle: "Option group",
    //         elementTypes: [EElementType.CHECKBOX, EElementType.RADIO],
    //     },
    // ],
]);

export const ELEMENT_BUTTON_LABELS: { [key in EElementType]: string } = {
    [EElementType.EMAIL]: "Email address",
    [EElementType.NUMERIC]: "Numbers",
    [EElementType.TEXT]: "Short text",
    [EElementType.TEXTAREA]: "Long text",
    [EElementType.CONTACT]: "Contact number",
    [EElementType.CHECKBOX]: "Checkbox",
    [EElementType.RADIO]: "Radio Button",
};
