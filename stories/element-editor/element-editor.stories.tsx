import type { Meta, StoryObj } from "@storybook/react";
import { noop } from "lodash";
import { ElementEditor } from "src/components/element-editor";
import {
    BuilderContext,
    EBuilderMode,
    IFocusedElement,
} from "src/context-providers";
import { EElementType } from "src/schemas";
import { Container } from "./doc-elements";

type Component = typeof ElementEditor;

const meta: Meta<Component> = {
    title: "Element Editor",
    component: ElementEditor,
};

export default meta;

const FOCUSED_ELEMENT: IFocusedElement = {
    element: {
        id: "firstName",
        internalId: "id1",
        label: "Last name",
        type: EElementType.EMAIL,
        placeholder: "Enter email",
    },
    isDirty: false,
};

const ELEMENT_2: IFocusedElement = {
    element: {
        id: "lastName",
        internalId: "id2",
        label: "Last name",
        type: EElementType.EMAIL,
        placeholder: "Enter email",
    },
    isDirty: false,
};

const ELEMENT_3: IFocusedElement = {
    element: {
        id: "emailAddress",
        internalId: "id3",
        label: "Email Address",
        type: EElementType.EMAIL,
        placeholder: "Enter email",
    },
    isDirty: false,
};

export const Default: StoryObj<Component> = {
    render: () => {
        return (
            <BuilderContext.Provider
                value={{
                    state: {
                        mode: EBuilderMode.ADD_ELEMENT,
                        elements: new Map()
                            .set(
                                FOCUSED_ELEMENT.element.internalId,
                                FOCUSED_ELEMENT
                            )
                            .set(ELEMENT_2.element.internalId, ELEMENT_2)
                            .set(ELEMENT_3.element.internalId, ELEMENT_3),
                        focusedElement: FOCUSED_ELEMENT,
                        showSidePanel: false,
                        elementIds: [],
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
