/**
 * Refer to the uiType in the Frontend Engine when setting
 * the value.
 * https://designsystem.life.gov.sg/web-frontend-engine/index.html?path=/docs/introduction-getting-started--docs
 *
 * Alphabetical order for easier checking
 */
export enum EElementType {
    CHECKBOX = "checkbox",
    CONTACT = "contact-field",
    EMAIL = "email-field",
    NUMERIC = "numeric-field",
    RADIO = "radio",
    TEXT = "text-field",
    TEXTAREA = "textarea",
}

export interface IBaseAttributes {
    id: string | undefined;
    internalId: string;
    type: EElementType;
}

export interface IBaseFieldAttributes extends IBaseAttributes {
    label: string | undefined;
}

export interface IBaseTextBasedFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
}

// =============================================================================
// ELEMENT TYPES (Same order as EElementType)
// =============================================================================
export type IContactField = IBaseTextBasedFieldAttributes;
export type IEmailField = IBaseTextBasedFieldAttributes;
export type INumericField = IBaseTextBasedFieldAttributes;
export type ITextField = IBaseTextBasedFieldAttributes;
export type ITextarea = IBaseTextBasedFieldAttributes;

export type TElement =
    | IEmailField
    | ITextField
    | ITextarea
    | INumericField
    | IContactField;
