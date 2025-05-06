import { ISelectSchema } from "@lifesg/web-frontend-engine/components/fields";
import { IPrefillConfig } from "src/translator";
export declare namespace DropdownSchemaParser {
    const schemaToElement: (schema: ISelectSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").IDropdownAttributes;
}
