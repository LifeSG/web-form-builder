/**
 * Refer to the uiType in the Frontend Engine when setting
 * the value.
 * https://designsystem.life.gov.sg/web-frontend-engine/index.html?path=/docs/introduction-getting-started--docs
 *
 * Alphabetical order for easier checking
 */
export declare enum EElementType {
    CONTACT = "contact-field",
    EMAIL = "email-field",
    NUMERIC = "numeric-field",
    RADIO = "radio",
    DROPDOWN = "select",
    TEXT = "text-field",
    TEXTAREA = "textarea"
}
export declare const TextBasedElementTypes: Set<EElementType>;
export declare const OptionGroupBasedElementTypes: Set<EElementType>;
export declare enum EConditionType {
    MORE_THAN = "More than",
    LESS_THAN = "Less than",
    EQUALS = "Equals",
    NOT_EQUALS = "Not equals"
}
export declare enum EValidationType {
    EMAIL_DOMAIN = "Email domain",
    WHOLE_NUMBERS = "Whole numbers",
    CUSTOM_REGEX = "Custom regex",
    MIN_VALUE = "Minimum value",
    MAX_VALUE = "Maximum value",
    MIN_LENGTH = "Minimum length",
    MAX_LENGTH = "Maximum length",
    CONTACT_NUMBER = "Contact number format"
}
export declare enum EValidationTypeFEE {
    MIN = "min",
    MAX = "max",
    INTEGER = "integer",
    MATCHES = "matches"
}
export declare enum EValidationRuleFEEContact {
    DEFAULT = "default",
    MOBILE = "mobile",
    HOUSE = "house"
}
export interface IBaseAttributes {
    id: string | undefined;
    internalId: string;
    type: EElementType;
}
export interface IValidation {
    validationType?: EValidationType;
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
export interface IOptionAttributes {
    value?: string;
    label?: string;
}
export interface IPillItemAttributes {
    content: string;
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
    description?: string;
    preselectedValue?: string;
    conditionalRendering?: IConditionalRendering[];
    prefill?: IPrefillAttributes[];
}
export interface IEmailFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    validation?: IValidation[];
}
export interface ITextFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    validation?: IValidation[];
}
export interface ITextareaAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    validation?: IValidation[];
    resizableInput: boolean;
    pills: boolean;
    pillItems?: IPillItemAttributes[];
    pillPosition?: "top" | "bottom" | null;
}
export interface IContactFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    validation: IValidation[];
    enableClearButton: boolean;
    defaultCountryCode: string;
    displayAsFixedCountryCode?: boolean;
}
export interface INumericFieldAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    validation?: IValidation[];
}
export interface IDropdownAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    dropdownItems?: IOptionAttributes[];
}
export interface IRadioButtonAttributes extends IBaseFieldAttributes {
    placeholder?: string;
    radioItems?: IOptionAttributes[];
}
export type TTextBasedElement = IEmailFieldAttributes | ITextFieldAttributes | ITextareaAttributes | INumericFieldAttributes | IContactFieldAttributes;
export type TOptionGroupBasedElement = IDropdownAttributes | IRadioButtonAttributes;
export type TElement = TTextBasedElement | TOptionGroupBasedElement;
export {};
