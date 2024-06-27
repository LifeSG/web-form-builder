import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { TElementMap } from "src/context-providers";
import { textBasedField } from "./text-based-field";

export namespace Translator {
    export const generateSchema = (elements: TElementMap) => {
        const fields = Object.values(elements).reduce((acc, value) => {
            const translatedChild = textBasedField.elementToSchema(value);
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
                            label: "Submit",
                            uiType: "submit",
                            disabled: "invalid-form",
                        },
                    },
                    uiType: "section",
                },
            },
        };
        return elementSchema;
    };

    export const parseSchema = (schema: string) => {
        console.log("this is the schema:", schema);
    };
}
