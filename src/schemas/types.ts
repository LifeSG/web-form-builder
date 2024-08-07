import {
    IBaseOptionGroupBasedFieldAttributes,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import * as yup from "yup";
import { BaseSchemaHelper } from "./base-helper";
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

export type TOverallTextBasedSchema = BaseSchemaHelper.TBaseSchema &
    (TTextBasedSchema | TTextAreaSchema);

export type TOverallOptionGroupBasedSchema = BaseSchemaHelper.TBaseSchema &
    TOptionGroupBasedSchema;

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedSchema>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedSchema>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedSchema | TOverallTextBasedSchema
>;

export type TSchemasWithValidation = TOverallTextBasedSchema;
