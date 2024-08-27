import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import {
    IContactFieldSchema,
    IEmailFieldSchema,
    INumericFieldSchema,
    ISelectSchema,
    ITextareaSchema,
    ITextFieldSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import { IValidation } from "src/context-providers";

export type TElementSchema =
    | ITextFieldSchema
    | ITextareaSchema
    | IEmailFieldSchema
    | INumericFieldSchema
    | ISelectSchema
    | IContactFieldSchema;

export type ValidationSchemaParser = (
    schema: IYupValidationRule
) => IValidation;
