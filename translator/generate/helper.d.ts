import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import { TElementMap } from "src/context-providers";
import { IConditionalRendering } from "src/context-providers/builder";
export declare const generateConditionalRenderingSchema: (conditions: IConditionalRendering[]) => TRenderRules[];
export declare const generatePrefillSchema: (elements: TElementMap) => {};
export declare const generateDefaultValuesSchema: (elements: TElementMap) => {};
