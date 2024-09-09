import { TFrontendEngineFieldSchema } from "@lifesg/web-frontend-engine";
import { EElementLabel } from "src/data";
import { TElement } from "../builder";

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
     * When set to `false`, the attribute field will be disabled.
     * Defaults to `true`, meaning the attribute is editable by default.
     */
    isEditable?: boolean;
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
     * Controls the editability of the specific element.
     *
     * When set to `false`, the Edit details form will be disabled for the element.
     * Defaults to `true`, meaning the element is editable by default.
     */
    isEditable?: boolean;
    /**
     * Configuration for attributes that are specific to the element.
     *
     * When configured, these settings will take precedence over the main attributes settings.
     */
    attributes?: {
        [K in keyof TCustomisableElementAttributes]?: IAttributeConfig;
    };
}

export type TCustomisableElementAttributes = Pick<
    TElement,
    "type" | "description" | "id" | "label" | "placeholder" | "preselectedValue"
>;

export type TCustomisableGlobalAttributes = Pick<
    TElement,
    | "type"
    | "description"
    | "id"
    | "label"
    | "placeholder"
    | "preselectedValue"
    | "prefill"
>;

interface ICustomElement {
    /**
     * Defines the schema properties for the custom element.
     *
     * Refer to https://designsystem.life.gov.sg/web-frontend-engine/index.html?path=/docs/introduction-getting-started--docs for the list of available fields.
     */
    properties: TFrontendEngineFieldSchema;
    /**
     * Controls whether the custom element is editable on the Edit details panel.
     *
     * Defaults to `true`, meaning the custom element is editable by default.
     */
    isEditable?: boolean;
}

export interface IFormBuilderConfig {
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

    //TODO: To be implemented later on
    // /**
    //  * An array of FormBuilder's supported element schemas that will be used to prepopulate FormBuilder.
    //  *
    //  * When provided, FormBuilder will be initialised with the specified elements.
    //  */
    // presetForm?: TElementSchema[];
    // /**
    //  * An array of custom element (supported by Frontend Engine) that can be used in the FormBuilder.
    //  *
    //  * This is useful for adding custom elements that are not part of the default FormBuilder elements but are supported by Frontend Engine.
    //  * When provided, FormBuilder will include the custom elements in the Add Elements panel.
    //  */
    // customElements?: ICustomElement[];
    // /**
    //  * An array of custom validations that can be applied to elements supported in FormBuilder.
    //  *
    //  * This allows for the addition of custom validations to elements that are not part of the default FormBuilder validations but are supported by the Frontend Engine.
    //  * When provided, FormBuilder will include the custom validation options, on top of the existing ones, to the specified uiType.
    //  */
    // customValidationOptions?: Pick<TElementSchema, "uiType" | "validation">[];
    // // support any kind of custom validation
    // // check FEE customValidationOptions
}
