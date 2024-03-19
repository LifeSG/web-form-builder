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
    id: string;
    internalId: string;
    type: EElementType;
}

export interface IBaseFieldAttributes extends IBaseAttributes {
    label: string;
}

export interface IBaseTextBasedFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
}

// =============================================================================
// ELEMENT TYPES
// =============================================================================
export type IEmailField = IBaseFieldAttributes;
export type INumericField = IBaseFieldAttributes;

// TODO: Add the different elements to form the union type
export type TElement = IEmailField | INumericField;
