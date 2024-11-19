import { EElementLabel } from "src/data";
import { TElement } from "../builder";
import { TElementSchema } from "src/translator/parse/types";
interface IPanelConfig {
    /**
     * Controls the visibility of the specific panel.
     *
     * When set to `false`, the panel will be hidden.
     * Defaults to `true`, meaning the panel is visible by default.
     */
    shouldShow?: boolean;
}
interface IAttributeConfig {
    /**
     * Controls the visibility of the specific attribute.
     *
     * When set to `false`, the attribute will be hidden.
     * Defaults to `true`, meaning the attribute is visible by default.
     */
    shouldShow?: boolean;
    /**
     * Controls the editability of the specific attribute.
     *
     * When set to `true`, the attribute field will be disabled.
     * Defaults to `false`, meaning the attribute is editable by default.
     */
    isDisabled?: boolean;
}
interface IElementConfig {
    /**
     * Controls the visibility of the specific element.
     *
     * When set to `false`, the element will be hidden from the Add Elements panel.
     * Defaults to `true`, meaning the element is visible by default.
     */
    shouldShow?: boolean;
    /**
     * Controls the editability of the specific attribute.
     *
     * When set to `true`, the attribute field will be disabled.
     * Defaults to `false`, meaning the attribute is editable by default.
     */
    isDisabled?: boolean;
    /**
     * Configuration for attributes that are specific to the element.
     *
     * When configured, these settings will take precedence over the main attributes settings.
     */
    attributes?: {
        [K in keyof TCustomisableElementAttributes]?: IAttributeConfig;
    };
}
export type TCustomisableElementAttributes = Pick<TElement, "type" | "description" | "id" | "label" | "placeholder" | "preselectedValue">;
export type TCustomisableGlobalAttributes = Pick<TElement, "type" | "description" | "id" | "label" | "placeholder" | "preselectedValue" | "prefill">;
export interface IPresetElement {
    /**
     * Defines the schema properties for the preset element that is supported by form builder.
     */
    schema: TElementSchema;
    /**
     * Controls whether the element is editable on the Edit details panel.
     *
     * Defaults to `false`, meaning the element is editable by default.
     */
    isDisabled?: boolean;
}
export interface IConfigState {
    /**
     * Configuration for the panels in FormBuilder.
     */
    panels?: {
        pages?: IPanelConfig;
    };
    /**
     * Configuration for individual elements within FormBuilder.
     *
     * The keys correspond to labels defined in the `EElementLabels` enum.
     */
    elements?: {
        [elementType in EElementLabel]?: IElementConfig;
    };
    /**
     * Configuration settings for attributes that are shared across all elements.
     *
     * These common settings can be customised or overwritten by each element's specific attribute settings under the `elements` prop.
     * Use this configuration to define default values or behaviors that apply broadly while allowing for individual element customisation as needed.
     */
    attributes?: {
        [K in keyof TCustomisableGlobalAttributes]?: IAttributeConfig;
    };
    /**
     * An array of FormBuilder's supported element schemas that will be used to prepopulate FormBuilder.
     *
     * When provided, FormBuilder will be initialised with the specified elements.
     * Users can specify the elements' properties and set them as disabled if needed with the `isDisabled` flag.
     */
    presetForm?: Record<string, IPresetElement>;
}
export {};