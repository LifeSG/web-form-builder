import { IEmailFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import { IPrefillConfig } from "src/translator";
export declare namespace EmailSchemaParser {
    const schemaToElement: (schema: IEmailFieldSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").IEmailFieldAttributes | import("src/context-providers").ITextFieldAttributes | import("src/context-providers").INumericFieldAttributes;
}
