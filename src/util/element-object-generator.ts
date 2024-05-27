import {
    EElementType,
    IBaseAttributes,
    IBaseTextBasedFieldAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SimpleIdGenerator } from "./simple-id-generator";

export namespace ElementObjectGenerator {
    export const generate = (
        type: EElementType,
        existingIds: string[],
        existingElementIds: string[]
    ) => {
        let internalId: string;
        while (!internalId || existingIds.includes(internalId)) {
            internalId = SimpleIdGenerator.generate();
        }
        const generateNewId = (
            type: EElementType,
            existingElementIds: string[]
        ) => {
            const generateId = (prefix: string) => {
                const regex = new RegExp(`^${prefix}(?:-(\\d+))?$`);
                let maxSuffix = -1;

                existingElementIds.forEach((existingElementId) => {
                    const match = existingElementId?.match(regex);
                    if (match) {
                        const suffix = match[1] ? parseInt(match[1], 10) : 0;
                        if (suffix > maxSuffix) {
                            maxSuffix = suffix;
                        }
                    }
                });

                return `${prefix}${maxSuffix + 1 > 0 ? `-${maxSuffix + 1}` : ""}`;
            };

            switch (type) {
                case EElementType.EMAIL:
                    return generateId("email-field");
                case EElementType.NUMERIC:
                    return generateId("numeric-field");
                case EElementType.CONTACT:
                    return generateId("contact-field");
                case EElementType.TEXT:
                    return generateId("short-text-field");
                case EElementType.TEXTAREA:
                    return generateId("long-text-field");
                default:
                    return null;
            }
        };

        const baseAttributes: IBaseAttributes = {
            internalId,
            type,
            id: generateNewId(type, existingElementIds),
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

        const extractBaseId = (id: string) => {
            const match = id.match(/^(.*?)(-copy(?:-\d+)?)?$/);
            return match ? match[1] : id;
        };

        const generateNewId = (baseId: string, existingIds: string[]) => {
            const regex = new RegExp(`^${baseId}-copy(?:-(\\d+))?$`);
            let maxSuffix = 0;

            existingIds.forEach((existingId) => {
                const match = existingId?.match(regex);
                if (match) {
                    const suffix = match[1] ? parseInt(match[1], 10) : 1;
                    if (suffix > maxSuffix) {
                        maxSuffix = suffix;
                    }
                }
            });

            return `${baseId}-copy${maxSuffix + 1 > 1 ? `-${maxSuffix + 1}` : ""}`;
        };

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
