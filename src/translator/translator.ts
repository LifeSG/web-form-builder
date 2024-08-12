import {
    IFrontendEngineData,
    TFrontendEngineFieldSchema,
} from "@lifesg/web-frontend-engine";
import {
    EElementType,
    IElementIdentifier,
    TElementMap,
} from "src/context-providers";
import { createDefaultValuesSchema, createPrefillSchema } from "./generate";
import {
    ContactSchemaGenerator,
    DropdownSchemaGenerator,
    EmailSchemaGenerator,
    LongTextSchemaGenerator,
    NumericSchemaGenerator,
    TextSchemaGenerator,
} from "./generate/elements";
import { parseSchemaBasedOnType, updateParsedElements } from "./helper";
import { ISchemaProps } from "./types";

export namespace Translator {
    // test for ui type
    export const generateSchema = (
        elements: TElementMap,
        orderedIdentifiers: IElementIdentifier[]
    ) => {
        const prefill = createPrefillSchema(elements);
        const defaultValues = createDefaultValuesSchema(elements);

        const orderedElements = orderedIdentifiers.reduce((acc, value) => {
            acc[value.internalId] = elements[value.internalId];
            return acc;
        }, {} as TElementMap);

        const fields = Object.values(orderedElements).reduce((acc, element) => {
            let translatedChild: Record<string, unknown>;
            switch (element.type) {
                case EElementType.EMAIL:
                    translatedChild =
                        EmailSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.TEXT:
                    translatedChild =
                        TextSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.TEXTAREA:
                    translatedChild =
                        LongTextSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.CONTACT:
                    translatedChild =
                        ContactSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.NUMERIC:
                    translatedChild =
                        NumericSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.DROPDOWN:
                    translatedChild =
                        DropdownSchemaGenerator.elementToSchema(element);
                    break;
            }
            return { ...acc, ...translatedChild };
        }, {});

        const elementsSchema: IFrontendEngineData = {
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
        return { schema: elementsSchema, prefill };
    };

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
