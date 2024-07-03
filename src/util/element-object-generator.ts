import {
    EElementType,
    IBaseAttributes,
    IBaseTextBasedFieldAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS, ELEMENT_ID_PREFIX } from "src/data";
import { SimpleIdGenerator } from "./simple-id-generator";

const generateNewElementId = (
    prefix: string,
    existingIds: string[],
    duplicate: boolean
) => {
    const regex = new RegExp(
        duplicate ? `^${prefix}-copy(?:-(\\d+))?$` : `^${prefix}(?:-(\\d+))?$`
    );

    let maxSuffix = duplicate ? 0 : -1;
    existingIds.forEach((existingElementId) => {
        const match = existingElementId?.match(regex);
        if (match) {
            const suffix = match[1]
                ? parseInt(match[1], 10)
                : duplicate
                  ? 1
                  : 0;
            maxSuffix = Math.max(maxSuffix, suffix);
        }
    });

    return duplicate
        ? `${prefix}-copy${maxSuffix + 1 > 1 ? `-${maxSuffix + 1}` : ""}`
        : `${prefix}${maxSuffix + 1 > 0 ? `-${maxSuffix + 1}` : ""}`;
};

const generateNewInternalId = (existingIds: string[]) => {
    let internalId: string;
    while (!internalId || existingIds.includes(internalId)) {
        internalId = SimpleIdGenerator.generate();
    }
    return internalId;
};

export namespace ElementObjectGenerator {
    export const generate = (
        type: EElementType,
        existingIds: string[],
        existingElementIds: string[]
    ) => {
        const baseAttributes: IBaseAttributes = {
            internalId: generateNewInternalId(existingIds),
            type,
            id: generateNewElementId(
                ELEMENT_ID_PREFIX[type],
                existingElementIds,
                false
            ),
        };

        switch (type) {
            case EElementType.EMAIL:
            case EElementType.NUMERIC:
            case EElementType.CONTACT:
            case EElementType.TEXT:
            case EElementType.TEXTAREA: {
                const attributes: IBaseTextBasedFieldAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    required: true,
                    requiredErrorMsg: "",
                    label: ELEMENT_BUTTON_LABELS[type],
                    columns: { desktop: 12, tablet: 8, mobile: 4 },
                    validation: [],
                    conditionalRendering: [],
                    prefill: [],
                };
                return attributes;
            }
            default:
                return null;
        }
    };

    export const duplicate = (
        element: TElement,
        existingInternalIds: string[],
        existingIds: string[]
    ) => {
        const extractBaseId = (id: string) => {
            const match = id.match(/^(.*?)(-copy(?:-\d+)?)?$/);
            return match ? match[1] : id;
        };

        const baseId = extractBaseId(element.id);
        const newId = generateNewElementId(baseId, existingIds, true);

        const duplicatedElement: TElement = {
            ...element,
            internalId: generateNewInternalId(existingInternalIds),
            id: newId,
        };

        return duplicatedElement;
    };
}
