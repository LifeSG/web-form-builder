import {
    IFrontendEngineData,
    TFrontendEngineFieldSchema,
} from "@lifesg/web-frontend-engine";
import {
    IContactFieldSchema,
    IEmailFieldSchema,
    INumericFieldSchema,
    ISelectSchema,
    ITextareaSchema,
    ITextFieldSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    IElementIdentifier,
    TElement,
    TElementMap,
} from "src/context-providers";
import {
    ContactSchemaGenerator,
    DropdownSchemaGenerator,
    EmailSchemaGenerator,
    LongTextSchemaGenerator,
    NumericSchemaGenerator,
    TextSchemaGenerator,
} from "./generate/elements";
import {
    generateDefaultValuesSchema,
    generatePrefillSchema,
} from "./generate/helper";
import {
    ContactSchemaParser,
    DropdownSchemaParser,
    EmailSchemaParser,
    LongTextSchemaParser,
    NumericSchemaParser,
    TextSchemaParser,
} from "./parse/elements";
import { updateParsedElements } from "./parse/helper";
import { ISchemaProps } from "./types";

export namespace Translator {
    export const generateSchema = (
        elements: TElementMap,
        orderedIdentifiers: IElementIdentifier[]
    ) => {
        const prefill = generatePrefillSchema(elements);
        const defaultValues = generateDefaultValuesSchema(elements);

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
        const elementSchemas: Record<string, TFrontendEngineFieldSchema> =
            formSchema?.schema?.sections?.section?.children?.grid?.["children"];

        const defaultValues = formSchema?.schema?.defaultValues;
        const parsedElements: TElement[] = [];

        if (Object.values(elementSchemas).length !== 0) {
            Object.entries(elementSchemas).forEach(([key, elementSchema]) => {
                const { uiType } = elementSchema;
                let parsedElement: TElement;

                const defaultValue: string | undefined = defaultValues[key];

                switch (uiType) {
                    case EElementType.EMAIL: {
                        parsedElement = EmailSchemaParser.schemaToElement(
                            elementSchema as IEmailFieldSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.TEXT: {
                        parsedElement = TextSchemaParser.schemaToElement(
                            elementSchema as ITextFieldSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.TEXTAREA: {
                        parsedElement = LongTextSchemaParser.schemaToElement(
                            elementSchema as ITextareaSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.NUMERIC: {
                        parsedElement = NumericSchemaParser.schemaToElement(
                            elementSchema as INumericFieldSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.CONTACT: {
                        parsedElement = ContactSchemaParser.schemaToElement(
                            elementSchema as IContactFieldSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.DROPDOWN: {
                        parsedElement = DropdownSchemaParser.schemaToElement(
                            elementSchema as ISelectSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                    }
                }
                parsedElements.push(parsedElement);
            });
            return updateParsedElements(parsedElements);
        }
        return null;
    };
}
