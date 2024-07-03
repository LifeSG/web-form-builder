import {
    EConditionType,
    IConditionalRendering,
    TElement,
    TElementMap,
} from "src/context-providers/builder";
import { ELEMENT_CONDITION_TYPES, SCHEMA_CONDITION_TYPES } from "src/data";
import { IPrefillSchema } from "src/form-builder";
import { generateNewInternalId } from "src/util";

interface ISchemaConditionChild {
    [comparator: string]: string | boolean;
}

interface ISchemaCondition {
    [key: string]: ISchemaConditionChild[];
}
export interface ISchemaPrefill {
    prefillMode: "Myinfo" | "Previous source" | "";
    actionId?: string;
    path: string;
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

export const translatePrefillObject = (
    prefill: IPrefillSchema,
    key: string
) => {
    const findPrefill = Object.entries(prefill).find(([id, _]) => id === key);
    return findPrefill[1];
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
    conditions: ISchemaCondition[]
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
                    });
                });
        });
        return translatedConditions;
    }, []);
};

export const updateTranslatedElements = (schemaElements: TElement[]) => {
    const newElements: TElementMap = {};
    const newOrderedIdentifiers = [];
    const updates = [];

    schemaElements.forEach((schemaElement) => {
        const newId = generateNewInternalId(
            Object.values(newElements).map((element) => element?.id)
        );
        newOrderedIdentifiers.push({ internalId: newId });

        const updatedElement = {
            ...schemaElement,
            internalId: newId,
        };

        newElements[newId] = updatedElement;
        updates.push(updatedElement);
    });

    Object.values(newElements).forEach((schema) => {
        if (
            schema.conditionalRendering &&
            schema.conditionalRendering.length > 0
        ) {
            schema.conditionalRendering.forEach((condition, index) => {
                const existingElement = Object.values(newElements).find(
                    (element) => element?.id === condition.fieldKey
                );
                if (existingElement) {
                    schema.conditionalRendering[index] = {
                        ...condition,
                        internalId: existingElement.internalId,
                    };
                }
            });
        }
    });

    return {
        newElements,
        newOrderedIdentifiers,
    };
};
