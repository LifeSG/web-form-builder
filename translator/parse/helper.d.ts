import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import { IConditionalRendering, IPrefillAttributes, TElement, TElementMap } from "src/context-providers";
import { IPrefillConfig } from "src/translator/types";
export declare const parseConditionalRenderingSchema: (conditions: TRenderRules[]) => IConditionalRendering[];
export declare const parsePrefillSchema: (prefill: IPrefillConfig, id: string) => IPrefillAttributes[];
export declare const updateParsedElements: (parsedElements: TElement[]) => {
    newElements: TElementMap;
    newOrderedIdentifiers: any[];
};
