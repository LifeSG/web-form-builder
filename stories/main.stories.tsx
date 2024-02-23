import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormBuilder } from "src";

type Component = typeof FormBuilder;

const meta: Meta<Component> = {
    title: "Main",
    component: FormBuilder,
};

export default meta;

export const Default: StoryObj<Component> = {
    render: () => {
        return <FormBuilder />;
    },
};
