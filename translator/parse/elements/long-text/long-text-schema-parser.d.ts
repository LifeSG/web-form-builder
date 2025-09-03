import { ITextareaSchema } from "@lifesg/web-frontend-engine/components/fields";
import { IPrefillConfig } from "src/translator";
export declare namespace LongTextSchemaParser {
    const schemaToElement: (schema: ITextareaSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").ITextareaAttributes;
}
