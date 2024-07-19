import { Meta, StoryObj } from "@storybook/react";
import { Component } from "react";
import { DocElement } from "./doc-elements";

const meta: Meta = {
    title: "Translator/Preview",
};

export default meta;

export const SamplePreview: StoryObj<Component> = {
    render: () => {
        return <DocElement />;
    },
};
