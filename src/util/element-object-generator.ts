import {
    EElementType,
    IBaseAttributes,
    IBaseFieldAttributes,
} from "src/schemas";
import { SimpleIdGenerator } from "./simple-id-generator";
import { ELEMENT_BUTTON_LABELS } from "src/data";

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
            case EElementType.CONTACT:
            case EElementType.EMAIL:
            case EElementType.NUMERIC:
            case EElementType.TEXT:
            case EElementType.TEXTAREA: {
                const attributes: IBaseFieldAttributes = {
                    ...baseAttributes,
                    label: ELEMENT_BUTTON_LABELS[type],
                };
                return attributes;
            }
            default:
                return null;
        }
    };
}
