import {
    EConditionType,
    EElementType,
    EValidationType,
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

export enum EElementLabel {
    EMAIL = "Email address",
    NUMERIC = "Numbers",
    TEXT = "Short text",
    TEXTAREA = "Long text",
    CONTACT = "Contact number",
    DROPDOWN = "Dropdown",
    CHECKBOX = "Checkbox",
    RADIO = "Radio Button",
}

export const ELEMENT_BUTTON_LABELS: { [key in EElementType]: EElementLabel } = {
    [EElementType.EMAIL]: EElementLabel.EMAIL,
    [EElementType.NUMERIC]: EElementLabel.NUMERIC,
    [EElementType.TEXT]: EElementLabel.TEXT,
    [EElementType.TEXTAREA]: EElementLabel.TEXTAREA,
    [EElementType.CONTACT]: EElementLabel.CONTACT,
    [EElementType.DROPDOWN]: EElementLabel.DROPDOWN,
};

// const LABEL_TO_TYPE_MAP: { [key in EElementLabel]: EElementType } =
//     Object.entries(ELEMENT_BUTTON_LABELS).reduce(
//         (acc, [type, label]) => {
//             acc[label as EElementLabel] = type as EElementType;
//             return acc;
//         },
//         {} as { [key in EElementLabel]: EElementType }
//     );

export const ELEMENT_ID_PREFIX: Record<EElementType, string> = {
    [EElementType.EMAIL]: "email-field",
    [EElementType.NUMERIC]: "numeric-field",
    [EElementType.CONTACT]: "contact-field",
    [EElementType.TEXT]: "short-text-field",
    [EElementType.TEXTAREA]: "long-text-field",
    [EElementType.DROPDOWN]: "select",
};

export const ELEMENT_VALIDATION_TYPES = {
    "Text field": {
        [EElementType.EMAIL]: {
            maxEntries: 1,
            validationTypes: [EValidationType.EMAIL_DOMAIN],
        },
        [EElementType.NUMERIC]: {
            maxEntries: 3,
            validationTypes: [
                EValidationType.WHOLE_NUMBERS,
                EValidationType.MIN_VALUE,
                EValidationType.MAX_VALUE,
            ],
        },
        [EElementType.TEXT]: {
            maxEntries: -1, // Set a negetive number so that it will allow unlimited entries as it will not be equal to 0
            validationTypes: [
                EValidationType.CUSTOM_REGEX,
                EValidationType.MIN_LENGTH,
                EValidationType.MAX_LENGTH,
            ],
        },
        [EElementType.TEXTAREA]: {
            maxEntries: 1, // Set a negetive number so that it will allow unlimited entries as it will not be equal to 0
            validationTypes: [EValidationType.MAX_LENGTH],
        },
        [EElementType.CONTACT]: {
            maxEntries: 1,
            validationTypes: [EValidationType.CONTACT_NUMBER],
        },
    },
};

export const SCHEMA_CONDITION_TYPES = {
    [EConditionType.MORE_THAN]: "moreThan",
    [EConditionType.LESS_THAN]: "lessThan",
    [EConditionType.EQUALS]: "equals",
    [EConditionType.NOT_EQUALS]: "notEquals",
};

export const ELEMENT_CONDITION_TYPES = {
    ["moreThan"]: EConditionType.MORE_THAN,
    ["lessThan"]: EConditionType.LESS_THAN,
    ["equals"]: EConditionType.EQUALS,
    ["notEquals"]: EConditionType.NOT_EQUALS,
};
