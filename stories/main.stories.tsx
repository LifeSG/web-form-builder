import type { Meta, StoryObj } from "@storybook/react";
import { FormBuilder } from "src";
import { DocElement } from "./doc-elements";
import { TElement } from "src/context-providers";
import { action } from "@storybook/addon-actions";

type Component = typeof FormBuilder;

const meta: Meta<Component> = {
    title: "Main",
    component: DocElement,
    argTypes: {
        onSubmit: {
            description: 'An async function that is called when the `Edit Details` form is submitted.',
        },
    },
};

export default meta;

export const Default: StoryObj<Component> = {
    render: () => {
        return <DocElement />;
    },
};

export const OnSubmit: StoryObj<Component> = {
    render: () => {
        const handleSubmit = async (formData: TElement) => {
            const logAction = action("onSubmit");
            logAction("Saving form...");
            logAction(formData);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            logAction("Form saved successfully!");
        };
        return <DocElement onSubmit={handleSubmit} />;
    },
};
