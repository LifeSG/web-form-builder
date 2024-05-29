import {
    EElementType,
    IBaseAttributes,
    IBaseTextBasedFieldAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SimpleIdGenerator } from "./simple-id-generator";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const extractBaseId = (id: string) => {
    const match = id.match(/^(.*?)(-copy(?:-\d+)?)?$/);
    return match ? match[1] : id;
};

const generateNewId = (baseId: string, existingIds: string[]) => {
    const regex = new RegExp(`^${baseId}-copy(?:-(\\d+))?$`);

    const suffixes = existingIds.map((existingId) => {
        const match = existingId?.match(regex);
        if (match) {
            return match[1] ? parseInt(match[1], 10) : 1;
        }
        return 0;
    });
    const maxSuffix = Math.max(0, ...suffixes);

    return `${baseId}-copy${maxSuffix + 1 > 1 ? `-${maxSuffix + 1}` : ""}`;
};

export namespace ElementObjectGenerator {
    export const generate = (type: EElementType, existingIds: string[]) => {
        let internalId: string;
        while (!internalId || existingIds.includes(internalId)) {
            internalId = SimpleIdGenerator.generate();
        }

        const baseAttributes: IBaseAttributes = {
            internalId,
            type,
            id: undefined,
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
        let internalId: string;
        while (!internalId || existingInternalIds.includes(internalId)) {
            internalId = SimpleIdGenerator.generate();
        }

        const baseId = extractBaseId(element.id);
        const newId = generateNewId(baseId, existingIds);

        const duplicatedElement: TElement = {
            ...element,
            internalId,
            id: newId,
        };

        return duplicatedElement;
    };
}
