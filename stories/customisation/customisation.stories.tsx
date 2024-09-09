import { Meta, StoryObj } from "@storybook/react";
import { Component } from "react";
import { FormBuilder } from "src";

const meta: Meta = {
    title: "Customisation/Main",
};

export default meta;

export const HidePrefill: StoryObj<Component> = {
    render: () => {
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <FormBuilder
                    config={{
                        attributes: {
                            prefill: {
                                shouldShow: false,
                            },
                        },
                    }}
                />
            </div>
        );
    },
};
