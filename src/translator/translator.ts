import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components";
import { TElementMap } from "src/context-providers";
import { textBasedField } from "./text-based-field";
import { createPrefillObject } from "./helper";

export namespace Translator {
    export function generateSchema(elements: TElementMap) {
        let fields = {};

        const prefill = createPrefillObject(elements);

        Object.entries(elements).forEach(([_, value]) => {
            const translatedChild = textBasedField.elementToSchema(value);
            fields = { ...fields, ...translatedChild };
        });

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
        return { schema: elementSchema, prefill: prefill };
    }

    export function translateSchema(schema: string) {
        console.log("this is the schema:", schema);
    }
}
