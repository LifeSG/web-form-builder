import {
    EConditionType,
    EElementType,
} from "src/context-providers/builder/element.types";

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
    {
        categoryTitle: "Option group",
        elementTypes: [EElementType.DROPDOWN],
    },
];

export const ELEMENT_BUTTON_LABELS: { [key in EElementType]: string } = {
    [EElementType.EMAIL]: "Email address",
    [EElementType.NUMERIC]: "Numbers",
    [EElementType.TEXT]: "Short text",
    [EElementType.TEXTAREA]: "Long text",
    [EElementType.CONTACT]: "Contact number",
    [EElementType.DROPDOWN]: "Dropdown",
    [EElementType.CHECKBOX]: "Checkbox",
    [EElementType.RADIO]: "Radio Button",
};

export const ELEMENT_ID_PREFIX: Record<EElementType, string> = {
    [EElementType.EMAIL]: "email-field",
    [EElementType.NUMERIC]: "numeric-field",
    [EElementType.CONTACT]: "contact-field",
    [EElementType.TEXT]: "short-text-field",
    [EElementType.TEXTAREA]: "long-text-field",
    [EElementType.DROPDOWN]: "select",
    [EElementType.CHECKBOX]: "checkbox-field",
    [EElementType.RADIO]: "radion-field",
};

export const ELEMENT_VALIDATION_TYPES = {
    "Text field": {
        [EElementType.EMAIL]: {
            maxEntries: 1,
            validationTypes: ["Email domain"],
        },
    },
};

export const SCHEMA_CONDITION_TYPES = {
    [EConditionType.MORE_THAN]: "moreThan",
    [EConditionType.LESS_THAN]: "lessThan",
    [EConditionType.EQUALS]: "equals",
    [EConditionType.NOT_EQUALS]: "notEquals",
};
