import {
    IBaseOptionGroupBasedFieldAttributes,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import { BaseSchemaHelper } from "./base-helper";
import { TTextBasedSchema } from "./text-based-fields";
import { TOptionGroupBasedSchema } from "./option-group-based-fields";
import * as yup from "yup";

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
    TTextBasedSchema;

export type TOverallOptionGroupBasedSchema = BaseSchemaHelper.TBaseSchema &
    TOptionGroupBasedSchema;

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedSchema>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedSchema>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedSchema | TOverallTextBasedSchema
>;
