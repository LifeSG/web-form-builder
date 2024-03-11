import type { Meta, StoryObj } from "@storybook/react";
import { noop } from "lodash";
import { Card } from "src/components/card";
import { TField } from "src/schemas";
import { EFieldType } from "src/schemas/types";
import { Container, List } from "./doc-elements";

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

const firstNameField: TField = {
    id: "first-name",
    internalId: "internalId-1",
    label: "First name",
    type: EFieldType.EMAIL,
};

const lastNameField: TField = {
    id: "last-name",
    internalId: "internalId-2",
    label: "Last name",
    type: EFieldType.EMAIL,
};

const emailField: TField = {
    id: "email-field",
    internalId: "internalId-3",
    label: "Email",
    type: EFieldType.EMAIL,
};

export const Default: StoryObj<Component> = {
    render: () => {
        return (
            <>
                <Card field={firstNameField} onClick={noop} />
                <Card field={lastNameField} isFocused onClick={noop} />
            </>
        );
    },
};

export const Unfocused: StoryObj<Component> = {
    render: () => {
        return <Card field={lastNameField} onClick={noop} />;
    },
};

export const Focused: StoryObj<Component> = {
    render: () => {
        return <Card field={lastNameField} isFocused onClick={noop} />;
    },
};

export const ColumnVariations: StoryObj<Component> = {
    render: () => {
        return (
            <>
                <Container type="grid">
                    <Card
                        desktopCols={[1, 7]}
                        field={firstNameField}
                        onClick={noop}
                    />
                    <Card
                        desktopCols={[7, 13]}
                        field={lastNameField}
                        onClick={noop}
                        isFocused
                    />
                </Container>
                <Container type="grid">
                    <Card
                        desktopCols={[1, 13]}
                        field={emailField}
                        onClick={noop}
                    />
                </Container>
                <Container type="grid">
                    <Card
                        desktopCols={[1, 13]}
                        isFocused
                        field={emailField}
                        onClick={noop}
                    />
                </Container>
            </>
        );
    },
};
