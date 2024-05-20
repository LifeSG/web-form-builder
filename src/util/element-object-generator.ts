import {
    EElementType,
    IBaseAttributes,
    IBaseTextBasedFieldAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SimpleIdGenerator } from "./simple-id-generator";

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
                };
                return attributes;
            }
            default:
                return null;
        }
    };

    export const duplicate = (element: TElement, existingIds: string[]) => {
        let internalId: string;
        while (!internalId || existingIds.includes(internalId)) {
            internalId = SimpleIdGenerator.generate();
        }

        const generateNewCopyId = (id: string) => {
            const parts = id.split("-");
            const number = parseInt(parts[parts.length - 1], 10);
            const incrementedNumber = number + 1;
            let newId = null;
            if (!existingIds.includes(`${id}-${incrementedNumber}`)) {
                newId = parts.slice(0, -1).join("-") + "-" + incrementedNumber;
            } else {
                newId =
                    parts.slice(0, -1).join("-") +
                    "-" +
                    (incrementedNumber + 1);
            }
            return newId;
        };

        const generateId = (id: string) => {
            switch (true) {
                case id.includes("-copy-"): {
                    return generateNewCopyId(id);
                }
                case id.includes("-copy") &&
                    !existingIds.includes(`${id}-copy`):
                    return id + "-2";
                default:
                    return id + "-copy";
            }
        };

        const duplicatedElement: TElement = {
            ...element,
            internalId,
            id: generateId(element.id),
        };
        return duplicatedElement;
    };
}
