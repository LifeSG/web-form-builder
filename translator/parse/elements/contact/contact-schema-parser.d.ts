import { IContactFieldSchema } from "@lifesg/web-frontend-engine/components/fields";
import { TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
export declare namespace ContactSchemaParser {
    const schemaToElement: (schema: IContactFieldSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => TElement;
}
