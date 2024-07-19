import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { TRenderRules } from "@lifesg/web-frontend-engine/context-providers";
import {
    EElementType,
    IColumns,
    IConditionalRendering,
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
    columns?: IColumns;
    placeholder?: string;
    label?: string;
    validation?: IValidation[];
    conditionalRendering?: IConditionalRendering[];
    prefill?: IPrefillAttributes[];
}

interface MockSchemaProps {
    defaultValues?: Record<string, unknown>;
    prefill?: MockPrefillSchema;
    children: MockChildrenSchema;
}

interface MockElementSchemaProps {
    id: string;
    label: string;
    uiType: EElementType;
    placeholder?: string;
    validation?: IYupValidationRule[];
    showIf?: TRenderRules[];
}

interface MockPrefillSchema {
    [key: string]: IPrefillAttributes[];
}

interface MockChildrenSchema {
    [key: string]: {
        label: string;
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
            ...(placeholder && { placeholder }),
            ...(validation && { validation }),
            ...(showIf && { showIf }),
        },
    };
};
