import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { IElementIdentifier, TElementMap } from "src/context-providers";
import { ISchemaProps } from "./types";
export declare namespace Translator {
    const generateSchema: (elements: TElementMap, orderedIdentifiers: IElementIdentifier[]) => {
        schema: IFrontendEngineData<undefined, undefined>;
        prefill: {};
    };
    const parseSchema: (formSchema: ISchemaProps) => {
        newElements: TElementMap;
        newOrderedIdentifiers: any[];
    };
}
