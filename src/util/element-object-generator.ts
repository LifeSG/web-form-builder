import { EElementType, IEmailField } from "src/schemas";
import { SimpleIdGenerator } from "./simple-id-generator";

export namespace ElementObjectGenerator {
    export const generate = (type: EElementType, existingIds: string[]) => {
        let internalId: string;
        while (!internalId || existingIds.includes(internalId)) {
            internalId = SimpleIdGenerator.generate();
        }

        switch (type) {
            case EElementType.EMAIL: {
                const newElement: IEmailField = {
                    internalId,
                    type,
                    id: undefined,
                    label: undefined,
                };
                return newElement;
            }
            default:
                return null;
        }
    };
}
