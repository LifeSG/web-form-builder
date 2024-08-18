import {
    IBaseOptionGroupBasedFieldAttributes,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import * as yup from "yup";
import { BaseYupSchemaHelper } from "./base-yup-schema-helper";
import { TOptionGroupBasedSchema } from "./option-group-based-fields";
import { TTextAreaSchema, TTextBasedSchema } from "./text-based-fields";

export type TBaseTextBasedFieldValues = Omit<
    IBaseTextBasedFieldAttributes,
    "internalId"
>;

export type TBaseOptionGroupBasedFieldValues = Omit<
    IBaseOptionGroupBasedFieldAttributes,
    "internalId"
>;

export type TFormFieldValues =
    | TOverallTextBasedSchema
    | TOverallOptionGroupBasedSchema;

export type TOverallTextBasedSchema = BaseYupSchemaHelper.TBaseSchema &
    (TTextBasedSchema | TTextAreaSchema);

export type TOverallOptionGroupBasedSchema = BaseYupSchemaHelper.TBaseSchema &
    TOptionGroupBasedSchema;

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedSchema>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedSchema>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedSchema | TOverallTextBasedSchema
>;

export type TSchemasWithValidation = TOverallTextBasedSchema;
