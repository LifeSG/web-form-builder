import {
    EElementType,
    EValidationType,
    IBaseFieldAttributes,
    IContactFieldAttributes,
    IDropdownAttributes,
    IEmailFieldAttributes,
    INumericFieldAttributes,
    ITextareaAttributes,
    ITextFieldAttributes,
    TElement,
} from "src/context-providers/builder/element.types";
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

export const generateNewInternalId = (existingIds: string[]) => {
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
        const baseAttributes: IBaseFieldAttributes = {
            internalId: generateNewInternalId(existingIds),
            type,
            id: generateNewElementId(
                ELEMENT_ID_PREFIX[type],
                existingElementIds,
                false
            ),
            required: true,
            requiredErrorMsg: "This is a required field.",
            preselectedValue: "",
            description: "",
            label: ELEMENT_BUTTON_LABELS[type],
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            conditionalRendering: [],
            prefill: [],
        };

        switch (type) {
            case EElementType.EMAIL: {
                const attributes: IEmailFieldAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    validation: [],
                };
                return attributes;
            }
            case EElementType.NUMERIC: {
                const attributes: INumericFieldAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    validation: [],
                };
                return attributes;
            }
            case EElementType.TEXT: {
                const attributes: ITextFieldAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    validation: [],
                };
                return attributes;
            }
            case EElementType.TEXTAREA: {
                const attributes: ITextareaAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    resizableInput: false,
                    pills: false,
                    validation: [],
                };
                return attributes;
            }
            case EElementType.DROPDOWN: {
                const attributes: IDropdownAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    dropdownItems: [
                        {
                            label: "",
                            value: "",
                        },
                        {
                            label: "",
                            value: "",
                        },
                    ],
                };
                return attributes;
            }
            case EElementType.CONTACT: {
                const attributes: IContactFieldAttributes = {
                    ...baseAttributes,
                    placeholder: "",
                    enableClearButton: true,
                    defaultCountryCode: "",
                    validation: [
                        {
                            validationType: EValidationType.CONTACT_NUMBER,
                            validationErrorMessage: "Invalid contact number.",
                        },
                    ],
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
