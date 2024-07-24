import {
    IFrontendEngineData,
    TFrontendEngineFieldSchema,
} from "@lifesg/web-frontend-engine";
import { IElementIdentifier, TElementMap } from "src/context-providers";
import {
    createPrefillObject,
    parseSchemaBasedOnType,
    updateParsedElements,
} from "./helper";
import { TextBasedField } from "./text-based-field";
import { ISchemaProps } from "./types";

export namespace Translator {
    export function generateSchema(
        elements: TElementMap,
        orderedIdentifiers: IElementIdentifier[]
    ) {
        const prefill = createPrefillObject(elements);

        const newElements = orderedIdentifiers.reduce((acc, value) => {
            acc[value.internalId] = elements[value.internalId];
            return acc;
        }, {} as TElementMap);

        const fields = Object.values(newElements).reduce((acc, element) => {
            const generateSchema = TextBasedField.elementToSchema(element);
            return { ...acc, ...generateSchema };
        }, {});

        const elementSchema: IFrontendEngineData = {
            sections: {
                section: {
                    children: {
                        grid: {
                            children: {
                                ...fields,
                            },
                            uiType: "grid",
                        },
                        "submit-button": {
                            disabled: "invalid-form",
                            label: "Submit",
                            uiType: "submit",
                        },
                    },
                    uiType: "section",
                },
            },
        };
        return { schema: elementSchema, prefill };
    }

    export const parseSchema = (formSchema: ISchemaProps) => {
        const schemaToParse = formSchema?.schema?.sections?.section?.children
            ?.grid?.["children"] as Record<string, TFrontendEngineFieldSchema>;
        if (Object.values(schemaToParse).length !== 0) {
            const parsedElements = parseSchemaBasedOnType(
                schemaToParse,
                formSchema.prefill
            );
            return updateParsedElements(parsedElements);
        } else {
            return null;
        }
    };
}
