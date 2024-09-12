import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IContactFieldSchema,
    IEmailFieldSchema,
    INumericFieldSchema,
    ISelectSchema,
    ITextareaSchema,
    ITextFieldSchema,
    TRadioButtonGroupSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import { IValidation } from "src/context-providers";

export type TElementSchema =
    | ITextFieldSchema
    | ITextareaSchema
    | IEmailFieldSchema
    | INumericFieldSchema
    | ISelectSchema
    | IContactFieldSchema
    | TRadioButtonGroupSchema;

export type ValidationSchemaParser = (
    schema: IYupValidationRule
) => IValidation;
