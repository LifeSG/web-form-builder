import * as yup from "yup";
import {
    DROPDOWN_YUP_SCHEMA,
    EMAIL_YUP_SCHEMA,
    LONG_TEXT_YUP_SCHEMA,
    NUMERIC_YUP_SCHEMA,
    TEXT_YUP_SCHEMA,
} from "./elements";
import { TBaseSchema } from "./helper";

export type TFormFieldValues =
    | TOverallTextBasedSchema
    | TOverallOptionGroupBasedSchema;

export type TEmailSchema = yup.InferType<typeof EMAIL_YUP_SCHEMA>;
export type TTextSchema = yup.InferType<typeof TEXT_YUP_SCHEMA>;
export type TLongTextSchema = yup.InferType<typeof LONG_TEXT_YUP_SCHEMA>;
export type TNumericSchema = yup.InferType<typeof NUMERIC_YUP_SCHEMA>;
export type TDropdownSchema = yup.InferType<typeof DROPDOWN_YUP_SCHEMA>;

export type TOverallTextBasedSchema = TBaseSchema &
    (TEmailSchema | TTextSchema | TLongTextSchema | TNumericSchema);

export type TOverallOptionGroupBasedSchema = TBaseSchema & TDropdownSchema;

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedSchema>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedSchema>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedSchema | TOverallTextBasedSchema
>;

export type TSchemasWithValidation = TOverallTextBasedSchema;
