import type { Meta, StoryObj } from "@storybook/react";
import { FormBuilder } from "src";
import { DocElement } from "./doc-elements";
import SidePanel from "src/components/side-panel/side-panel";

type Component = typeof FormBuilder;

const meta: Meta<Component> = {
    title: "Main",
    component: DocElement,
};

export default meta;

export const Default: StoryObj<Component> = {
    render: () => {
        return <SidePanel/>
    },
};
