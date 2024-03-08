import type { Meta, StoryObj } from "@storybook/react";
import { FormBuilder } from "src";
import { DocElement } from "./doc-elements";

type Component = typeof FormBuilder;

const meta: Meta<Component> = {
    title: "Main",
    component: DocElement,
};

export default meta;

export const Default: StoryObj<Component> = {
    render: () => {
        return <DocElement />;
    },
};
