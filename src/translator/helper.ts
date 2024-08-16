import { TFrontendEngineFieldSchema } from "@lifesg/web-frontend-engine";
import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import {
    EConditionType,
    EElementType,
    IConditionalRendering,
    IPrefillAttributes,
    TElement,
    TElementMap,
} from "src/context-providers/builder";
import { ELEMENT_CONDITION_TYPES, SCHEMA_CONDITION_TYPES } from "src/data";
import { TextBasedField } from "./text-based-field";
import { IPrefillConfig } from "./types";
import { PREFILL_ACTIONID_REGEX, PREFILL_PATH_REGEX } from "src/yup-schemas";

export const createPrefillObject = (elements: TElementMap) => {
    const prefill = Object.values(elements).reduce((acc, element) => {
        if (element.prefill && element.prefill.length > 0) {
            acc[element.id] = element.prefill;
        }
        return acc;
    }, {});

    return prefill;
};

export const parsePrefillObject = (
    prefill: IPrefillConfig,
    key: string
): IPrefillAttributes[] => {
    const prefillAttributes = prefill[key] as IPrefillAttributes[];
    return prefillAttributes?.filter((value) => {
        return (
            PREFILL_PATH_REGEX.exec(value?.path) !== null &&
            (!value?.actionId ||
                PREFILL_ACTIONID_REGEX.exec(value?.actionId) !== null) &&
            (value?.prefillMode === "Myinfo" ||
                value?.prefillMode === "Previous source")
        );
    });
};

export const createConditionalRenderingObject = (
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

export const createDefaultValuesObject = (elements: TElementMap) => {
    const defaultValues = Object.values(elements).reduce((acc, element) => {
        if ("preselectedValue" in element && element.preselectedValue) {
            acc[element.id] = element.preselectedValue;
        }
        return acc;
    }, {});

    return defaultValues;
};

export const parseConditionalRenderingObject = (conditions: TRenderRules[]) => {
    return conditions.reduce(
        (
            parsedConditions: IConditionalRendering[],
            condition: TRenderRules
        ) => {
            Object.entries(condition).forEach(([key, value]) => {
                value
                    .filter((obj: TRenderRules) => !("filled" in obj))
                    .forEach((condition: TRenderRules) => {
                        const [comparator, compValue] =
                            Object.entries(condition)[0];
                        parsedConditions.push({
                            fieldKey: key,
                            comparator: ELEMENT_CONDITION_TYPES[comparator],
                            value: compValue as unknown as string,
                            internalId: "",
                        });
                    });
            });
            return parsedConditions;
        },
        []
    );
};

export const parseSchemaBasedOnType = (
    schemaToParse: Record<string, TFrontendEngineFieldSchema>,
    prefill: IPrefillConfig
) => {
    const parsedElements = [];
    Object.entries(schemaToParse).forEach(([key, element]) => {
        const { uiType } = element;
        switch (uiType) {
            case EElementType.CONTACT:
            case EElementType.EMAIL:
            case EElementType.NUMERIC:
            case EElementType.TEXT:
            case EElementType.TEXTAREA: {
                parsedElements.push(
                    TextBasedField.parseToElement(
                        element as TextBasedField.TElementSchema,
                        key,
                        prefill
                    )
                );
                break;
            }
        }
    });
    return parsedElements;
};

export const updateParsedElements = (parsedElements: TElement[]) => {
    const newElements: TElementMap = {};
    const newOrderedIdentifiers = [];

    Object.values(parsedElements).forEach((parsedElement: TElement) => {
        newElements[parsedElement.internalId] = parsedElement;
        newOrderedIdentifiers.push({
            internalId: parsedElement.internalId,
            size: "full",
        });

        if (parsedElement?.conditionalRendering?.length > 0) {
            parsedElement.conditionalRendering.forEach((condition, index) => {
                const existingElement = Object.values(parsedElements).find(
                    (element) => element?.id === condition.fieldKey
                );

                if (existingElement) {
                    parsedElement.conditionalRendering[index] = {
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
