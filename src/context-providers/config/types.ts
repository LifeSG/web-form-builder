import { TFrontendEngineFieldSchema } from "@lifesg/web-frontend-engine";
import { EElementLabel } from "src/data";
import {
    IContactFieldAttributes,
    IDropdownAttributes,
    IEmailFieldAttributes,
    INumericFieldAttributes,
    ITextareaAttributes,
    ITextFieldAttributes,
    TElement,
} from "../builder";

interface IPanelConfig {
    /**
     * Controls the visibility of the specific panel.
     *
     * When set to `false`, the panel will be hidden.
     * Defaults to `true`, meaning the panel is visible by default.
     */
    visible?: boolean;
}

interface ISectionConfig {
    /**
     * Controls the visibility of the specific section.
     *
     * When set to `false`, the section will be hidden.
     * Defaults to `true`, meaning the section is visible by default.
     */
    visible?: boolean;
}

interface IAttributeConfig {
    /**
     * Controls the visibility of the specific attribute.
     *
     * When set to `false`, the attribute will be hidden.
     * Defaults to `true`, meaning the attribute is visible by default.
     */
    visible?: boolean;
    /**
     * Controls the editability of the specific attribute.
     *
     * When set to `false`, the attribute field will be disabled.
     * Defaults to `true`, meaning the attribute is editable by default.
     */
    editable?: boolean;
}

type TElementAttributesMap = {
    [EElementLabel.EMAIL]: IEmailFieldAttributes;
    [EElementLabel.TEXT]: ITextFieldAttributes;
    [EElementLabel.TEXTAREA]: ITextareaAttributes;
    [EElementLabel.DROPDOWN]: IDropdownAttributes;
    [EElementLabel.NUMERIC]: INumericFieldAttributes;
    [EElementLabel.CONTACT]: IContactFieldAttributes;
    [EElementLabel.CHECKBOX]: any;
    [EElementLabel.RADIO]: any;
};

interface IElementConfig<T extends keyof TElementAttributesMap> {
    /**
     * Controls the visibility of the specific element.
     *
     * When set to `false`, the element will be hidden from the Add Elements panel.
     * Defaults to `true`, meaning the element is visible by default.
     */
    visible?: boolean;
    /**
     * Controls the editability of the specific element.
     *
     * When set to `false`, the Edit details form will be disabled for the element.
     * Defaults to `true`, meaning the element is editable by default.
     */
    editable?: boolean;
    /**
     * Configuration for attributes that are specific to the element.
     *
     * When configured, these settings will take precedence over the main attributes settings.
     */
    attributes?: {
        [K in keyof TElementAttributesMap[T]]?: IAttributeConfig;
    };
}

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
    editable?: boolean;
}

export interface IFormBuilderConfig {
    /**
     * Configuration for the panels in FormBuilder.
     */
    panels?: {
        pages?: IPanelConfig;
    };
    /**
     * Configuration for the sections of FormBuilder.
     */
    sections?: {
        prefill?: ISectionConfig;
    };
    /**
     * Configuration for individual elements within FormBuilder.
     *
     * The keys correspond to labels defined in the `EElementLabels` enum.
     */
    elements?: {
        [elementType in EElementLabel]?: IElementConfig<elementType>;
    };
    /**
     * Configuration for attributes that are common across elements.
     *
     * When configured, these settings will take precedence over the individual element's attribute settings.
     */
    attributes?: {
        [K in keyof TElement]?: IAttributeConfig;
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
