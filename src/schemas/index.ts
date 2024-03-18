export enum EElementType {
    EMAIL = "email-field",
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

// TODO: Add the different elements to form the union type
export type TElement = IEmailField;
