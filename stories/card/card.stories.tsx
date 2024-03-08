import type { Meta, StoryObj } from "@storybook/react";
import { noop } from "lodash";
import { Card } from "src/components/card";
import { List } from "src/components/list";
import { BuilderProvider, useBuilder } from "src/context-providers/builder";
import { TField } from "src/schemas";
import { EFieldType } from "src/schemas/types";

type Component = typeof Card;

const meta: Meta<Component> = {
    title: "Card",
    component: Card,
    decorators: [
        (Story) => (
            <List>
                <Story />
            </List>
        ),
    ],
};

export default meta;

const field1: TField = {
    id: "id-1",
    internalId: "internalId-1",
    label: "First name",
    type: EFieldType.EMAIL,
};

const field2: TField = {
    id: "id-2",
    internalId: "internalId-2",
    label: "Last name",
    type: EFieldType.EMAIL,
};

export const Default: StoryObj<Component> = {
    render: () => {
        return (
            <>
                <Card
                    field={field1}
                    isFocused={false}
                    onClick={noop}
                />
                <Card
                    field={field2}
                    isFocused={false}
                    onClick={noop}
                />
            </>
        );
    },
};

export const Unfocused: StoryObj<Component> = {
    render: () => {
        return <Card field={field2} isFocused={false} onClick={noop} />;
    },
};

export const Focused: StoryObj<Component> = {
    render: () => {
        return <Card field={field2} isFocused onClick={noop} />;
    },
};
