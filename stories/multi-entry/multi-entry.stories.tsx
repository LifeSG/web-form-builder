import { Form } from "@lifesg/react-design-system/form";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChildEntry, MultiEntry } from "src/components/common";
import { Container, FieldWrapper } from "./doc-element";

type Component = typeof MultiEntry;

const meta: Meta<Component> = {
    title: "Multi Entry",
    component: MultiEntry,
};

export default meta;

const ChildComponent = ({ onDelete, options }) => {
    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Form.Select
                        placeholder="Select"
                        selectedOption={
                            options.length === 1 ? options[0] : "Select"
                        }
                        options={options}
                        disabled={options.length === 1}
                    />
                </div>
                <div>
                    <Form.Textarea placeholder="Enter rule" />
                </div>
                <div>
                    <Form.Input placeholder="Set error message" />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};

export const Default: StoryObj<Component> = {
    render: () => {
        const [numberOfChildEntry, setNumberOfChildEntry] = useState(0);
        const mockOptions = ["Validation 1", "Validation 2"];
        const deleteHandler = () => console.log("delete works!");

        const renderChildren = () => {
            return Array.from({ length: numberOfChildEntry }, (_, index) => (
                <ChildComponent
                    key={index}
                    onDelete={deleteHandler}
                    options={mockOptions}
                />
            ));
        };

        const handleAddButtonClick = () => {
            setNumberOfChildEntry((num) => num + 1);
        };

        return (
            <Container>
                <MultiEntry
                    onAdd={handleAddButtonClick}
                    title="Example"
                    buttonLabel="child"
                    disabledButton={numberOfChildEntry === mockOptions.length}
                >
                    {renderChildren()}
                </MultiEntry>
            </Container>
        );
    },
};
