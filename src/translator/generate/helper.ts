import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import { TElementMap } from "src/context-providers";
import {
    EConditionType,
    IConditionalRendering,
} from "src/context-providers/builder";
import { SCHEMA_CONDITION_TYPES } from "src/data";

export const generateConditionalRenderingSchema = (
    conditions: IConditionalRendering[]
): TRenderRules[] => {
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

export const generatePrefillSchema = (elements: TElementMap) => {
    const prefill = Object.values(elements).reduce((acc, element) => {
        if (element.prefill && element.prefill.length > 0) {
            acc[element.id] = element.prefill;
        }
        return acc;
    }, {});

    return prefill;
};

export const generateDefaultValuesSchema = (elements: TElementMap) => {
    const defaultValues = Object.values(elements).reduce((acc, element) => {
        if ("preselectedValue" in element && element.preselectedValue) {
            acc[element.id] = element.preselectedValue;
        }
        return acc;
    }, {});

    return defaultValues;
};
