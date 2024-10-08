import * as yup from "yup";
import {
    DROPDOWN_YUP_SCHEMA,
    EMAIL_YUP_SCHEMA,
    LONG_TEXT_YUP_SCHEMA,
    NUMERIC_YUP_SCHEMA,
    TEXT_YUP_SCHEMA,
} from "./elements";
import { RADIO_BUTTON_YUP_SCHEMA } from "./elements/radio-button-yup-schema";
import { TBaseValues } from "./helper";

export type TFormFieldValues =
    | TOverallTextBasedValues
    | TOverallOptionGroupBasedValues;

export type TEmailValues = yup.InferType<typeof EMAIL_YUP_SCHEMA>;
export type TTextValues = yup.InferType<typeof TEXT_YUP_SCHEMA>;
export type TLongTextValues = yup.InferType<typeof LONG_TEXT_YUP_SCHEMA>;
export type TNumericValues = yup.InferType<typeof NUMERIC_YUP_SCHEMA>;
export type TDropdownValues = yup.InferType<typeof DROPDOWN_YUP_SCHEMA>;
export type TRadioValues = yup.InferType<typeof RADIO_BUTTON_YUP_SCHEMA>;

export type TOverallTextBasedValues = TBaseValues &
    (TEmailValues | TTextValues | TLongTextValues | TNumericValues);

export type TOverallOptionGroupBasedValues = TBaseValues &
    (TDropdownValues | TRadioValues);

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedValues>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedValues>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedValues | TOverallTextBasedValues
>;

export type TSchemasWithValidation = TOverallTextBasedValues;
