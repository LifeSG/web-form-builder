import {
    IFrontendEngineData,
    TFrontendEngineFieldSchema,
} from "@lifesg/web-frontend-engine";
import {
    EElementType,
    IElementIdentifier,
    TElementMap,
} from "src/context-providers";
import { ISchemaProps } from "src/form-builder";
import {
    createDefaultValuesObject,
    createPrefillObject,
    parseSchemaBasedOnType,
    updateParsedElements,
} from "./helper";
import { OptionGroupBasedField } from "./option-group-based-field";
import { TextBasedField } from "./text-based-field";

export namespace Translator {
    export function generateSchema(
        elements: TElementMap,
        orderedIdentifiers: IElementIdentifier[]
    ) {
        const prefill = createPrefillObject(elements);
        const defaultValues = createDefaultValuesObject(elements);

        const newElements = orderedIdentifiers.reduce((acc, value) => {
            acc[value.internalId] = elements[value.internalId];
            return acc;
        }, {} as TElementMap);

        const fields = Object.values(newElements).reduce((acc, element) => {
            let translatedChild: Record<string, unknown>;
            switch (element.type) {
                case EElementType.EMAIL:
                case EElementType.TEXT:
                case EElementType.TEXTAREA:
                case EElementType.CONTACT:
                case EElementType.NUMERIC:
                    translatedChild = TextBasedField.elementToSchema(element);
                    break;
                case EElementType.CHECKBOX:
                case EElementType.RADIO:
                case EElementType.DROPDOWN:
                    translatedChild =
                        OptionGroupBasedField.elementToSchema(element);
                    break;
            }
            return { ...acc, ...translatedChild };
        }, {});

        const elementSchema: IFrontendEngineData = {
            defaultValues,
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
        const parsedElements = parseSchemaBasedOnType(schemaToParse);
        return updateParsedElements(parsedElements);
    };
}
