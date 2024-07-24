import { IBaseTextBasedFieldAttributes } from "src/context-providers";
import * as yup from "yup";
import { BaseSchemaHelper } from "./base-helper";
import { TEXT_AREA_SCHEMA, TEXT_BASED_SCHEMA } from "./text-based-fields";

export type IBaseTextBasedFieldValues = Omit<
    IBaseTextBasedFieldAttributes,
    "internalId"
>;

export type TTextBasedSchema = yup.InferType<
    ReturnType<typeof TEXT_BASED_SCHEMA>
>;

export type TTextAreaSchema = yup.InferType<
    ReturnType<typeof TEXT_AREA_SCHEMA>
>;

export type TOverallTextBasedSchema = BaseSchemaHelper.TBaseSchema &
    (TTextBasedSchema | TTextAreaSchema);
