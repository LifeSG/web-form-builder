import { ITextFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import { IPrefillConfig } from "src/translator";
export declare namespace TextSchemaParser {
    const schemaToElement: (schema: ITextFieldSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").IEmailFieldAttributes | import("src/context-providers").ITextFieldAttributes | import("src/context-providers").INumericFieldAttributes;
}
