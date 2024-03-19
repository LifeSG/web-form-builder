/**
 * Refer to the uiType in the Frontend Engine when setting
 * the value.
 * https://designsystem.life.gov.sg/web-frontend-engine/index.html?path=/docs/introduction-getting-started--docs
 */
export enum EElementType {
    EMAIL = "email-field",
    NUMERIC = "numeric-field",
    TEXT = "text-field",
    TEXTAREA = "textarea",
    CONTACT = "contact-field",
    CHECKBOX = "checkbox",
    RADIO = "radio",
}

export interface IBaseAttributes {
    id: string;
    internalId: string;
    type: EElementType;
}

export interface IBaseFieldAttributes extends IBaseAttributes {
    label: string;
}

export type IEmailField = IBaseFieldAttributes;
export type INumericField = IBaseFieldAttributes;

// TODO: Add the different elements to form the union type
export type TElement = IEmailField | INumericField;
