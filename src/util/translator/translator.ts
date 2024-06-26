import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components";
import { TElementMap } from "src/context-providers";
import { textBasedField } from "./text-based-field";

export namespace Translator {
    export function generateSchema(elements: TElementMap) {
        let fields = {};

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
                            label: "Submit",
                            uiType: "submit",
                        },
                    },
                    uiType: "section",
                },
            },
        };
        return elementSchema;
    }

    export function translateSchema(schema: string) {
        console.log("this is the schema:", schema);
    }
}
