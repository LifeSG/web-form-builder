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

export enum EConditionType {
    MORE_THAN = "More than",
    LESS_THAN = "Less than",
    EQUALS = "Equals",
    NOT_EQUALS = "Not equals",
}

export interface IBaseAttributes {
    id: string | undefined;
    internalId: string;
    type: EElementType;
}

export interface IValidation {
    validationType?: string;
    validationRule?: string;
    validationErrorMessage?: string;
}

export interface IConditionalRendering {
    fieldKey?: string;
    comparator?: string;
    value?: string;
    internalId: string;
}

export interface IPrefillAttributes {
    prefillMode?: "Myinfo" | "Previous source" | "";
    actionId?: string;
    path?: string;
}

type MobileCol = 1 | 2 | 3 | 4;
type MobileColRange = MobileCol | 5;
type TabletCol = MobileCol | 5 | 6 | 7 | 8;
type TabletColRange = TabletCol | 9;
type DesktopCol = TabletCol | 9 | 10 | 11 | 12;
type DesktopColRange = DesktopCol | 13;
export interface IColumns {
    desktop: DesktopCol | [DesktopColRange, DesktopColRange];
    tablet: TabletCol | [TabletColRange, TabletColRange];
    mobile: MobileCol | [MobileColRange, MobileColRange];
}

export interface IBaseFieldAttributes extends IBaseAttributes {
    label: string;
    required: boolean;
    requiredErrorMsg?: string | undefined;
    columns: IColumns;
    placeholder?: string;
    description?: string;
}

export interface ITextareaFieldAttributes
    extends IBaseTextBasedFieldAttributes {
    resizableInput?: boolean;
    preSelectedValue?: string;
}

export interface IBaseTextBasedFieldAttributes extends IBaseFieldAttributes {
    validation?: IValidation[];
    conditionalRendering?: IConditionalRendering[];
    prefill?: IPrefillAttributes[];
}

// =============================================================================
// ELEMENT TYPES (Same order as EElementType)
// =============================================================================
export type IContactField = IBaseTextBasedFieldAttributes;
export type IEmailField = IBaseTextBasedFieldAttributes;
export type INumericField = IBaseTextBasedFieldAttributes;
export type ITextField = IBaseTextBasedFieldAttributes;
export type ITextarea = ITextareaFieldAttributes;

export type TElement =
    | IEmailField
    | ITextField
    | ITextarea
    | INumericField
    | IContactField;
