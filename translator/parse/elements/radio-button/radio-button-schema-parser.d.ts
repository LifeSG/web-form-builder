import { TRadioButtonGroupSchema } from "@lifesg/web-frontend-engine/components/fields";
import { IPrefillConfig } from "src/translator";
export declare namespace RadioSchemaParser {
    const schemaToElement: (schema: TRadioButtonGroupSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").IRadioButtonAttributes;
}
