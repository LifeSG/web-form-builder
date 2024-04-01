import { EElementType } from "../context-providers/builder/element.types";

interface IElementCategoryAttributes {
    categoryTitle: string;
    elementTypes: EElementType[];
}

export const ELEMENTS_CATEGORIES: IElementCategoryAttributes[] = [
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
    // {
    //     categoryTitle: "Option group",
    //     elementTypes: [EElementType.CHECKBOX, EElementType.RADIO],
    // },
];

export const ELEMENT_BUTTON_LABELS: { [key in EElementType]: string } = {
    [EElementType.EMAIL]: "Email address",
    [EElementType.NUMERIC]: "Numbers",
    [EElementType.TEXT]: "Short text",
    [EElementType.TEXTAREA]: "Long text",
    [EElementType.CONTACT]: "Contact number",
    [EElementType.CHECKBOX]: "Checkbox",
    [EElementType.RADIO]: "Radio Button",
};
