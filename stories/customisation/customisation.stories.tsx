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

export const PresetForm: StoryObj<Component> = {
    render: () => {
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <FormBuilder
                    config={{
                        presetForm: {
                            field1: {
                                schema: {
                                    uiType: "text-field",
                                    label: {
                                        mainLabel: "Address",
                                        subLabel: "Enter your address",
                                    },
                                },
                            },
                            field2: {
                                schema: {
                                    uiType: "numeric-field",
                                    label: "Number",
                                },
                            },
                            field3: {
                                schema: {
                                    uiType: "select",
                                    label: "Select",
                                    options: [
                                        { label: "Option 1", value: "option1" },
                                        { label: "Option 2", value: "option2" },
                                    ],
                                },
                            },
                        },
                    }}
                />
            </div>
        );
    },
};

export const PresetFormWithDisabledElement: StoryObj<Component> = {
    render: () => {
        return (
            <div style={{ height: "100vh", width: "100vw" }}>
                <FormBuilder
                    config={{
                        presetForm: {
                            field1: {
                                schema: {
                                    uiType: "text-field",
                                    label: {
                                        mainLabel: "Address",
                                        subLabel: "Enter your address",
                                    },
                                },
                                isDisabled: true,
                            },
                            field2: {
                                schema: {
                                    uiType: "numeric-field",
                                    label: "Number",
                                },
                            },
                            field3: {
                                schema: {
                                    uiType: "select",
                                    label: "Select",
                                    options: [
                                        { label: "Option 1", value: "option1" },
                                        { label: "Option 2", value: "option2" },
                                    ],
                                },
                            },
                        },
                    }}
                />
            </div>
        );
    },
};
