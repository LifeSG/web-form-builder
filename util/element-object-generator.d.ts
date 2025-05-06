import { EElementType, IDropdownAttributes, IEmailFieldAttributes, IRadioButtonAttributes, TElement } from "src/context-providers/builder/element.types";
export declare const generateNewInternalId: (existingIds: string[]) => string;
export declare namespace ElementObjectGenerator {
    const generate: (type: EElementType, existingIds: string[], existingElementIds: string[]) => IEmailFieldAttributes | IDropdownAttributes | IRadioButtonAttributes;
    const duplicate: (element: TElement, existingInternalIds: string[], existingIds: string[]) => TElement;
}
