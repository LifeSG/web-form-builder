import type { Meta, StoryObj } from "@storybook/react";
import { noop } from "lodash";
import { ElementEditor } from "src/components/element-editor";
import {
    BuilderContext,
    EBuilderMode,
    EElementType,
    IFocusedElement,
    TElement,
} from "src/context-providers";
import { Container } from "./doc-elements";

type Component = typeof ElementEditor;

const meta: Meta<Component> = {
    title: "Element Editor",
    component: ElementEditor,
};

export default meta;

const ELEMENT_1: TElement = {
    id: "firstName",
    internalId: "id1",
    label: "Last name",
    type: EElementType.EMAIL,
    placeholder: "Enter email",
    required: false,
};

const FOCUSED_ELEMENT: IFocusedElement = {
    element: ELEMENT_1,
    isDirty: false,
};

const ELEMENT_2: TElement = {
    id: "lastName",
    internalId: "id2",
    label: "Last name",
    type: EElementType.EMAIL,
    placeholder: "Enter email",
    required: false,
};

const ELEMENT_3: TElement = {
    id: "emailAddress",
    internalId: "id3",
    label: "Email Address",
    type: EElementType.EMAIL,
    placeholder: "Enter email",
    required: false,
};

export const Default: StoryObj<Component> = {
    render: () => {
        return (
            <BuilderContext.Provider
                value={{
                    state: {
                        mode: EBuilderMode.ADD_ELEMENT,
                        elements: {
                            [ELEMENT_1.internalId]: ELEMENT_1,
                            [ELEMENT_2.internalId]: ELEMENT_2,
                            [ELEMENT_3.internalId]: ELEMENT_3,
                        },
                        focusedElement: FOCUSED_ELEMENT,
                        showSidePanel: false,
                        orderedIdentifiers: [],
                    },
                    dispatch: noop,
                }}
            >
                <Container>
                    <ElementEditor />
                </Container>
            </BuilderContext.Provider>
        );
    },
};
