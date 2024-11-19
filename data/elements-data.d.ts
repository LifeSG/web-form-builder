import { EConditionType, EElementType, EValidationType } from "src/context-providers/builder/element.types";
interface IElementCategoryAttributes {
    categoryTitle: string;
    elementTypes: EElementType[];
}
export declare const ELEMENTS_CATEGORIES: IElementCategoryAttributes[];
export declare enum EElementLabel {
    EMAIL = "Email address",
    NUMERIC = "Numbers",
    TEXT = "Short text",
    TEXTAREA = "Long text",
    CONTACT = "Contact number",
    DROPDOWN = "Dropdown",
    CHECKBOX = "Checkbox",
    RADIO = "Radio Button"
}
export declare const ELEMENT_BUTTON_LABELS: {
    [key in EElementType]: EElementLabel;
};
export declare const ELEMENT_ID_PREFIX: Record<EElementType, string>;
export declare const ELEMENT_VALIDATION_TYPES: {
    "Text field": {
        "email-field": {
            maxEntries: number;
            validationTypes: EValidationType[];
        };
        "numeric-field": {
            maxEntries: number;
            validationTypes: EValidationType[];
        };
        "text-field": {
            maxEntries: number;
            validationTypes: EValidationType[];
        };
        textarea: {
            maxEntries: number;
            validationTypes: EValidationType[];
        };
        "contact-field": {
            maxEntries: number;
            validationTypes: EValidationType[];
        };
    };
};
export declare const SCHEMA_CONDITION_TYPES: {
    "More than": string;
    "Less than": string;
    Equals: string;
    "Not equals": string;
};
export declare const ELEMENT_CONDITION_TYPES: {
    moreThan: EConditionType;
    lessThan: EConditionType;
    equals: EConditionType;
    notEquals: EConditionType;
};
export {};
