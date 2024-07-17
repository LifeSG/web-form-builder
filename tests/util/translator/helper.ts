import {
    EElementType,
    IColumns,
    IConditionalRendering,
    IPrefillAttributes,
    IValidation,
    TElementMap,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { ISchemaConditionalRendering } from "src/translator";
import { TextBasedField } from "src/translator/text-based-field";

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
    validation?: TextBasedField.ISchemaValidation[];
    showIf?: ISchemaConditionalRendering[];
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
        validation?: TextBasedField.ISchemaValidation[];
        showIf?: ISchemaConditionalRendering[];
    };
}

export const generateMockElement = (props: MockElementProps): TElementMap => {
    return {
        [props.id]: {
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
