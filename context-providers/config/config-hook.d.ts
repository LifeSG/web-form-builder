import { EElementLabel } from "src/data";
import { EElementType, IFocusedElement } from "../builder";
import { IConfigState, TCustomisableGlobalAttributes } from "./types";
export declare const useConfigContext: () => IConfigState;
export declare const usePresetForm: () => Record<string, import("./types").IPresetElement>;
export declare const useShouldShowPanel: (panel: keyof IConfigState["panels"]) => boolean;
export declare const useIsElementDisabled: (elementId: string, elementType: EElementType) => boolean;
export declare const useIsAttributeDisabled: (focusedElement: IFocusedElement, attribute: keyof TCustomisableGlobalAttributes) => any;
export declare const useShouldShowField: (fieldName: string, elementName: EElementLabel) => any;
export declare const useShouldShowPrefill: () => boolean;