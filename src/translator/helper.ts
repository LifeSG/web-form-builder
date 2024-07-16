import {
    EConditionType,
    IConditionalRendering,
    TElementMap,
} from "src/context-providers/builder";
import { SCHEMA_CONDITION_TYPES } from "src/data";

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

export const createDefaultValuesObject = (elements: TElementMap) => {
    const defaultValues = Object.values(elements).reduce((acc, element) => {
        if (element.preselectedValue) {
            acc[element.id] = element.preselectedValue;
        }
        return acc;
    }, {});

    return defaultValues;
};
