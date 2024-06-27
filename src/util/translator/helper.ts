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
        const conditionObj = conditions.map((condition) => {
            const value =
                condition.comparator === EConditionType.LESS_THAN ||
                condition.comparator === EConditionType.MORE_THAN
                    ? parseInt(condition.value)
                    : condition.value;
            return {
                [condition.fieldKey]: [
                    {
                        filled: true,
                    },
                    {
                        [SCHEMA_CONDITION_TYPES[condition.comparator]]: value,
                    },
                ],
            };
        });
        return conditionObj;
    }
};
