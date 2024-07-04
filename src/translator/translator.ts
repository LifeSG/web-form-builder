import {
    IFrontendEngineData,
    TFrontendEngineFieldSchema,
} from "@lifesg/web-frontend-engine";
import { TElementMap } from "src/context-providers";
import { ISchemaProps } from "src/form-builder";
import {
    createPrefillObject,
    translateSchemaBasedOnType,
    updateTranslatedElements,
} from "./helper";
import { TextBasedField } from "./text-based-field";

export namespace Translator {
    export function generateSchema(elements: TElementMap) {
        const prefill = createPrefillObject(elements);

        const fields = Object.values(elements).reduce((acc, element) => {
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

    export const parseSchema = (formSchema: ISchemaProps) => {
        const schemaToTranslate = formSchema?.schema?.sections?.section
            ?.children?.grid?.["children"] as Record<
            string,
            TFrontendEngineFieldSchema
        >;
        const translatedElements =
            translateSchemaBasedOnType(schemaToTranslate);
        return updateTranslatedElements(translatedElements);
    };
}
