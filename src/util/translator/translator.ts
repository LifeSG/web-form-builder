import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { TElement, TElementMap } from "src/context-providers";
import { elementToSchema } from "./helper";

export namespace Translator {
    export namespace textBasedField {
        export interface ISchemaValidation {
            [key: string]: string | boolean;
            errorMessage: string;
        }
        export const createValidationObject = (element: TElement) => {
            const validation: ISchemaValidation[] = [
                {
                    required: element.required,
                    errorMessage: element.requiredErrorMsg,
                },
            ];
            return validation;
        };
    }

    export const generateSchema = (elements: TElementMap) => {
        let fields = {};

        fields = Object.values(elements).reduce((acc, value) => {
            const translatedChild = elementToSchema(value);
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
