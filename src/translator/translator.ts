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
    TRadioButtonGroupSchema,
} from "@lifesg/web-frontend-engine/components/fields";
import {
    EElementType,
    IContactFieldAttributes,
    IElementIdentifier,
    ITextareaAttributes,
    TElement,
    TElementMap,
} from "src/context-providers";
import {
    ContactSchemaGenerator,
    DropdownSchemaGenerator,
    EmailSchemaGenerator,
    generateDefaultValuesSchema,
    generatePrefillSchema,
    LongTextSchemaGenerator,
    NumericSchemaGenerator,
    TextSchemaGenerator,
} from "./generate";
import { RadioButtonSchemaGenerator } from "./generate/elements/radio-button/radio-button-schema-generator";
import {
    ContactSchemaParser,
    DropdownSchemaParser,
    EmailSchemaParser,
    LongTextSchemaParser,
    NumericSchemaParser,
    TextSchemaParser,
    updateParsedElements,
} from "./parse";
import { RadioSchemaParser } from "./parse/elements/radio-button/radio-button-schema-parser";
import { ISchemaProps } from "./types";

export namespace Translator {
    export const generateSchema = (
        elements: TElementMap,
        orderedIdentifiers: IElementIdentifier[],
        options?: {
            shouldShowPrefill?: boolean;
        }
    ) => {
        const shouldShowPrefill = options?.shouldShowPrefill ?? true;
        const prefill = shouldShowPrefill
            ? generatePrefillSchema(elements)
            : {};
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
                    translatedChild = LongTextSchemaGenerator.elementToSchema(
                        element as ITextareaAttributes
                    );
                    break;
                case EElementType.CONTACT:
                    translatedChild = ContactSchemaGenerator.elementToSchema(
                        element as IContactFieldAttributes
                    );
                    break;
                case EElementType.NUMERIC:
                    translatedChild =
                        NumericSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.DROPDOWN:
                    translatedChild =
                        DropdownSchemaGenerator.elementToSchema(element);
                    break;
                case EElementType.RADIO:
                    translatedChild =
                        RadioButtonSchemaGenerator.elementToSchema(element);
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
        return {
            schema: elementsSchema,
            ...(shouldShowPrefill && { prefill }),
        };
    };

    export const parseSchema = (
        formSchema: ISchemaProps,
        options?: {
            shouldShowPrefill?: boolean;
        }
    ) => {
        const elementSchemas: Record<string, TFrontendEngineFieldSchema> =
            formSchema?.schema?.sections?.section?.children?.grid?.["children"];

        const shouldShowPrefill = options?.shouldShowPrefill ?? true;

        if (!elementSchemas) {
            throw new Error("Element schemas are missing");
        }

        if (Object.keys(elementSchemas).length === 0) {
            return null;
        }

        const defaultValues = formSchema?.schema?.defaultValues;
        const parsedElements: TElement[] = [];

        if (Object.values(elementSchemas).length !== 0) {
            Object.entries(elementSchemas).forEach(([key, elementSchema]) => {
                const { uiType } = elementSchema;

                if (!uiType) {
                    throw new Error("UI type is missing");
                }

                let parsedElement: TElement;

                const defaultValue: string | undefined = defaultValues[key];

                switch (uiType) {
                    case EElementType.EMAIL: {
                        parsedElement = EmailSchemaParser.schemaToElement(
                            elementSchema as IEmailFieldSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.TEXT: {
                        parsedElement = TextSchemaParser.schemaToElement(
                            elementSchema as ITextFieldSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.TEXTAREA: {
                        parsedElement = LongTextSchemaParser.schemaToElement(
                            elementSchema as ITextareaSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.NUMERIC: {
                        parsedElement = NumericSchemaParser.schemaToElement(
                            elementSchema as INumericFieldSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.CONTACT: {
                        parsedElement = ContactSchemaParser.schemaToElement(
                            elementSchema as IContactFieldSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.DROPDOWN: {
                        parsedElement = DropdownSchemaParser.schemaToElement(
                            elementSchema as ISelectSchema,
                            key,
                            shouldShowPrefill ? formSchema.prefill : {},
                            defaultValue
                        );
                        break;
                    }
                    case EElementType.RADIO: {
                        parsedElement = RadioSchemaParser.schemaToElement(
                            elementSchema as TRadioButtonGroupSchema,
                            key,
                            formSchema.prefill,
                            defaultValue
                        );
                        break;
                    }
                    default: {
                        throw new Error("Invalid element type");
                    }
                }
                parsedElements.push(parsedElement);
            });
            return updateParsedElements(parsedElements);
        }
        return null;
    };
}
