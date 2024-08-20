import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { IComplexLabel } from "@lifesg/web-frontend-engine/components/fields";
import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import {
    EElementType,
    IColumns,
    IConditionalRendering,
    IDropdownItemAttributes,
    IPrefillAttributes,
    IValidation,
    TElementMap,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
interface MockElementProps {
    type: EElementType;
    id: string;
    internalId: string;
    required?: boolean;
    requiredErrorMsg?: string;
    description?: string;
    columns?: IColumns;
    placeholder?: string;
    label?: string;
    validation?: IValidation[];
    conditionalRendering?: IConditionalRendering[];
    prefill?: IPrefillAttributes[];
    preselectedValue?: string;
}

interface MockSchemaProps {
    defaultValues?: Record<string, unknown>;
    prefill?: MockPrefillSchema;
    children: MockChildrenSchema;
}

interface MockElementSchemaProps {
    id: string;
    label: IComplexLabel;
    uiType: EElementType;
    placeholder?: string;
    validation?: IYupValidationRule[];
    showIf?: TRenderRules[];
    dropdownItems?: IDropdownItemAttributes[];
}

interface MockPrefillSchema {
    [key: string]: IPrefillAttributes[];
}

interface MockChildrenSchema {
    [key: string]: {
        label: IComplexLabel;
        uiType: EElementType;
        columns: IColumns;
        placeholder?: string;
        validation?: IYupValidationRule[];
        showIf?: TRenderRules[];
    };
}

export const generateMockElement = (props: MockElementProps): TElementMap => {
    return {
        [props.internalId]: {
            required: true,
            columns: { desktop: 12, tablet: 8, mobile: 4 },
            label: ELEMENT_BUTTON_LABELS[props.type],
            ...props,
        },
    };
};

export const generateMockSchema = ({
    defaultValues = {},
    prefill = {},
    children,
}: MockSchemaProps) => {
    return {
        prefill,
        schema: {
            defaultValues,
            sections: {
                section: {
                    children: {
                        grid: {
                            children,
                            uiType: "grid",
                        },
                        "submit-button": {
                            disabled: "invalid-form",
                            label: "Submit",
                            uiType: "submit",
                        },
                    },
                    uiType: "section",
                },
            },
        },
    };
};

export const generateMockElementSchema = ({
    id,
    label,
    uiType,
    placeholder,
    validation,
    showIf,
    dropdownItems,
}: MockElementSchemaProps): MockChildrenSchema => {
    return {
        [id]: {
            label,
            uiType,
            columns: {
                desktop: 12,
                tablet: 8,
                mobile: 4,
            },
            ...(dropdownItems && { options: dropdownItems }),
            ...(placeholder && { placeholder }),
            ...(validation && { validation }),
            ...(showIf && { showIf }),
        },
    };
};
