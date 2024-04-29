import { Form } from "@lifesg/react-design-system/form";
import type { Meta, StoryObj } from "@storybook/react";
import { ChildEntry } from "src/components/common";
import { FieldWrapper } from "./doc-elements";
import { Container } from "./doc-elements";

type Component = typeof ChildEntry;

const meta: Meta<Component> = {
    title: "Child Entry",
    component: ChildEntry,
};

export default meta;

const mockOptions = ["Validation 1"];

export const Default: StoryObj<Component> = {
    render: () => {
        return (
            <Container>
                <ChildEntry
                    onDelete={() => {
                        console.log("delete works!");
                    }}
                >
                    <FieldWrapper>
                        <div>
                            <Form.Select
                                label=""
                                placeholder={"Select"}
                                selectedOption={mockOptions[0]}
                                options={mockOptions}
                                disabled={mockOptions.length === 1}
                            />
                        </div>
                        <div>
                            <Form.Textarea placeholder={"Enter rule"} />
                        </div>
                        <div>
                            <Form.Input placeholder="Set error message" />
                        </div>
                    </FieldWrapper>
                </ChildEntry>
            </Container>
        );
    },
};
