import { IPrefillConfig } from "src/translator";
import { TElementSchema } from "../types";
export declare const parseBaseSchema: (schema: TElementSchema, id: string, prefill: IPrefillConfig, defaultValue?: string) => import("src/context-providers").IEmailFieldAttributes | import("src/context-providers").ITextFieldAttributes | import("src/context-providers").INumericFieldAttributes | import("src/context-providers").IDropdownAttributes | import("src/context-providers").IRadioButtonAttributes;
