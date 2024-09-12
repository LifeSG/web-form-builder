import { useContext } from "react";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { EElementType, IFocusedElement } from "../builder";
import { ConfigContext } from "./config-provider";
import { TCustomisableGlobalAttributes } from "./types";

export const useConfigContext = () => {
    const context = useContext(ConfigContext);
    return context;
};

export const useShouldShowPrefill = () => {
    const { attributes } = useConfigContext();

    const shouldShow = attributes?.prefill?.shouldShow ?? true;

    return shouldShow;
};

export const usePresetForm = () => {
    const { presetForm } = useConfigContext();

    return presetForm;
};

export const useIsElementDisabled = (
    elementId: string,
    elementType: EElementType
) => {
    const { presetForm, elements } = useConfigContext();

    const elementConfig = elements?.[ELEMENT_BUTTON_LABELS[elementType]];
    const isElementConfigDisabled = elementConfig?.isDisabled;

    const isPresetFormDisabled = presetForm?.[elementId]?.isDisabled;

    return isElementConfigDisabled ?? isPresetFormDisabled;
};

export const useIsAttributeDisabled = (
    focusedElement: IFocusedElement,
    attribute: keyof TCustomisableGlobalAttributes
) => {
    const { attributes, elements } = useConfigContext();

    const elementType = focusedElement?.element?.type;
    const elementAttributes =
        elements?.[ELEMENT_BUTTON_LABELS[elementType]]?.attributes;

    const isElementAttributeDisabled =
        elementAttributes?.[attribute]?.isDisabled;
    const isGlobalAttributeDisabled = attributes?.[attribute]?.isDisabled;

    return isElementAttributeDisabled ?? isGlobalAttributeDisabled;
};
