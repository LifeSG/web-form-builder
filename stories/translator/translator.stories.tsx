import { Meta } from "@storybook/react";
import { EElementType, TElementMap } from "src/context-providers";
import { FormPreview } from "src/components/form-preview";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaView } from "src/components/schema-view";

const meta: Meta = {
    title: "Translator/Preview",
};

export default meta;

export const UIFormPreview = () => {
    const elements: TElementMap = {
        mock123: {
            internalId: "mock123",
            type: EElementType.EMAIL,
            id: "mockElement",
            required: true,
            label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
            placeholder: "This is an email field",
            columns: 6,
        },
        mock256: {
            internalId: "mock256",
            type: EElementType.TEXT,
            id: "mockElement1",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
            placeholder: "This is an short text field",
            columns: 6,
        },
        mock672: {
            internalId: "mock672",
            type: EElementType.TEXTAREA,
            id: "mockElement2",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
            placeholder: "This is an text area",
            columns: 12,
        },

        mock673: {
            internalId: "mock673",
            type: EElementType.NUMERIC,
            id: "mockElement3",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.NUMERIC],
            placeholder: "This is an numeric field",
            columns: 6,
        },

        mock674: {
            internalId: "mock674",
            type: EElementType.CONTACT,
            id: "mockElement4",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.CONTACT],
            placeholder: "Must have 8 numbers",
            columns: 6,
        },
    };
    return <FormPreview elements={elements} />;
};

export const SchemaPreview = () => {
    const elements: TElementMap = {
        mock123: {
            internalId: "mock123",
            type: EElementType.EMAIL,
            id: "mockElement",
            required: true,
            label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
            placeholder: "This is an email field",
            columns: 6,
        },
        mock256: {
            internalId: "mock256",
            type: EElementType.TEXT,
            id: "mockElement1",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
            placeholder: "This is an short text field",
            columns: 6,
        },
        mock672: {
            internalId: "mock672",
            type: EElementType.TEXTAREA,
            id: "mockElement2",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA],
            placeholder: "This is an text area",
            columns: 12,
        },

        mock673: {
            internalId: "mock673",
            type: EElementType.NUMERIC,
            id: "mockElement3",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.NUMERIC],
            placeholder: "This is an numeric field",
            columns: 6,
        },

        mock674: {
            internalId: "mock674",
            type: EElementType.CONTACT,
            id: "mockElement4",
            required: false,
            label: ELEMENT_BUTTON_LABELS[EElementType.CONTACT],
            placeholder: "Must have 8 numbers",
            columns: 6,
        },
    };
    return <SchemaView elements={elements} />;
};
