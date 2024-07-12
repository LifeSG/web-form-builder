import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { IElementIdentifier, TElementMap } from "src/context-providers";
import { TextBasedField } from "./text-based-field";
import { createPrefillObject } from "./helper";

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
            const translatedChild = TextBasedField.elementToSchema(element);
            return { ...acc, ...translatedChild };
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

    export function translateSchema(schema: string) {
        console.log("this is the schema:", schema);
    }
}
