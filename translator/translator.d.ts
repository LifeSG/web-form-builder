import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { IElementIdentifier, TElementMap } from "src/context-providers";
import { ISchemaProps } from "./types";
export declare namespace Translator {
    const generateSchema: (elements: TElementMap, orderedIdentifiers: IElementIdentifier[], options?: {
        shouldShowPrefill?: boolean;
    }) => {
        prefill: {};
        schema: IFrontendEngineData<undefined, undefined>;
    };
    const parseSchema: (formSchema: ISchemaProps, options?: {
        shouldShowPrefill?: boolean;
    }) => {
        newElements: TElementMap;
        newOrderedIdentifiers: any[];
    };
}
