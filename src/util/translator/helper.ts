import {
    EConditionType,
    IConditionalRendering,
    TElementMap,
} from "src/context-providers/builder";
import { SCHEMA_CONDITION_TYPES } from "src/data";

export const createPrefillObject = (elements: TElementMap) => {
    let prefill = {};
    const prefillObj = Object.values(elements).map((value) => {
        if (value.prefill) {
            return {
                [value.id]: value.prefill,
            };
        }
    });
    Object.values(prefillObj).forEach((prefilObjChild) => {
        prefill = { ...prefill, ...prefilObjChild };
    });
    return prefill;
};

export const createConditionalRenderingObject = (
    conditions: IConditionalRendering[]
) => {
    if (conditions) {
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
                    {
                        [SCHEMA_CONDITION_TYPES[condition.comparator]]: value,
                    },
                ];
            } else {
                acc[condition.fieldKey].push({
                    [SCHEMA_CONDITION_TYPES[condition.comparator]]: value,
                });
            }
            return acc;
        }, {});
        return Object.keys(conditionObj).length === 0 ? [] : [conditionObj];
    }
    return [];
};
