import {
    IBaseOptionGroupBasedFieldAttributes,
    IBaseTextBasedFieldAttributes,
} from "src/context-providers";
import * as yup from "yup";
import { BaseYupSchemaHelper } from "./base-yup-schema-helper";
import { OPTION_GROUP_BASED_SCHEMA } from "./option-group-based-fields";
import { TEXT_AREA_SCHEMA, TEXT_BASED_SCHEMA } from "./text-based-fields";

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

export type TBaseSchema = yup.InferType<
    ReturnType<typeof BaseYupSchemaHelper.getBaseYupSchema>
>;

export type TTextBasedSchema = yup.InferType<
    ReturnType<typeof TEXT_BASED_SCHEMA>
>;

export type TTextAreaSchema = yup.InferType<
    ReturnType<typeof TEXT_AREA_SCHEMA>
>;

export type TOverallTextBasedSchema = TBaseSchema &
    (TTextBasedSchema | TTextAreaSchema);

export type TOptionGroupBasedSchema = yup.InferType<
    typeof OPTION_GROUP_BASED_SCHEMA
>;

export type TOverallOptionGroupBasedSchema = TBaseSchema &
    TOptionGroupBasedSchema;

export type TOverallOptionGroupBasedYupSchema =
    yup.ObjectSchema<TOverallOptionGroupBasedSchema>;

export type TOverallTextBasedYupSchema =
    yup.ObjectSchema<TOverallTextBasedSchema>;

export type TYupSchema = yup.ObjectSchema<
    TOverallOptionGroupBasedSchema | TOverallTextBasedSchema
>;

export type TSchemasWithValidation = TOverallTextBasedSchema;
