import { TFrontendEngineFieldSchema } from "@lifesg/web-frontend-engine";
import {
    EConditionType,
    EElementType,
    IConditionalRendering,
    TElement,
    TElementMap,
} from "src/context-providers/builder";
import { ELEMENT_CONDITION_TYPES, SCHEMA_CONDITION_TYPES } from "src/data";
import { TextBasedField } from "./text-based-field";

interface ISchemaConditionChild {
    [comparator: string]: string | boolean;
}

interface ISchemaCondition {
    [key: string]: ISchemaConditionChild[];
}

export interface ISchemaConditionalRendering {
    [key: string]: {
        filled?: boolean;
        equals?: string | number;
    }[];
}

export const createPrefillObject = (elements: TElementMap) => {
    const prefill = Object.values(elements).reduce((acc, element) => {
        if (element.prefill && element.prefill.length > 0) {
            acc[element.id] = element.prefill;
        }
        return acc;
    }, {});

    return prefill;
};

export const createConditionalRenderingObject = (
    conditions: IConditionalRendering[]
): ISchemaConditionalRendering[] => {
    if (!conditions || conditions.length === 0) {
        return;
    }

    const conditionObj = conditions.reduce((acc, condition) => {
        const value =
            condition.comparator === EConditionType.LESS_THAN ||
            condition.comparator === EConditionType.MORE_THAN
                ? parseInt(condition.value)
                : condition.value;

        if (!acc[condition.fieldKey]) {
            acc[condition.fieldKey] = [
                {
                    filled: true,
                },
            ];
        }
        acc[condition.fieldKey].push({
            [SCHEMA_CONDITION_TYPES[condition.comparator]]: value,
        });
        return acc;
    }, {});

    return Object.keys(conditionObj).length === 0 ? [] : [conditionObj];
};

export const translateConditionalRenderingObject = (
    conditions: ISchemaCondition[],
    internalId: string
) => {
    return conditions.reduce((translatedConditions, condition) => {
        Object.entries(condition).forEach(([key, value]) => {
            value
                .filter((obj) => !("filled" in obj))
                .forEach((condition) => {
                    const [comparator, compValue] =
                        Object.entries(condition)[0];
                    translatedConditions.push({
                        fieldKey: key,
                        comparator: ELEMENT_CONDITION_TYPES[comparator],
                        value: compValue,
                        internalId,
                    });
                });
        });
        return translatedConditions;
    }, []);
};

export const translateSchemaBasedOnType = (
    schemaToTranslate: Record<string, TFrontendEngineFieldSchema>
) => {
    const translatedElements = [];
    Object.entries(schemaToTranslate).forEach(([key, element]) => {
        const { uiType } = element;
        switch (uiType) {
            case EElementType.CONTACT:
            case EElementType.EMAIL:
            case EElementType.NUMERIC:
            case EElementType.TEXT:
            case EElementType.TEXTAREA: {
                translatedElements.push(
                    TextBasedField.translateToElement(element, key)
                );
                break;
            }
            default: {
                return;
            }
        }
    });
    return translatedElements;
};

export const updateTranslatedElements = (schemaElements: TElement[]) => {
    const newElements: TElementMap = {};
    const newOrderedIdentifiers = [];

    schemaElements.forEach((schemaElement) => {
        newElements[schemaElement.internalId] = schemaElement;
        newOrderedIdentifiers.push({ internalId: schemaElement.internalId });
    });

    return {
        newElements,
        newOrderedIdentifiers,
    };
};
