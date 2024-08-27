import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import {
    IConditionalRendering,
    IPrefillAttributes,
    TElement,
    TElementMap,
} from "src/context-providers";
import { ELEMENT_CONDITION_TYPES } from "src/data";
import { IPrefillConfig } from "src/translator/types";
import { PREFILL_ACTIONID_REGEX, PREFILL_PATH_REGEX } from "src/util";

export const parseConditionalRenderingSchema = (conditions: TRenderRules[]) => {
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

export const parsePrefillSchema = (
    prefill: IPrefillConfig,
    id: string
): IPrefillAttributes[] => {
    const prefillAttributes = prefill[id] as IPrefillAttributes[];

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
                } else {
                    parsedElement.conditionalRendering.splice(index, 1);
                }
            });
        }
    });

    return {
        newElements,
        newOrderedIdentifiers,
    };
};
