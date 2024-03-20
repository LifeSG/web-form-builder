import type { Meta, StoryObj } from "@storybook/react";
import noop from "lodash/noop";
import { ElementCard, ElementSelectorCard } from "src/components";
import { EElementType, TElement } from "src/schemas";
import { List } from "./doc-elements";
import {
    BuilderContext,
    EBuilderMode,
    IFocusedElement,
} from "src/context-providers";

type Component = typeof ElementCard;

const meta: Meta<Component> = {
    title: "Card",
    component: ElementCard,
    decorators: [
        (Story) => (
            <List>
                <Story />
            </List>
        ),
    ],
};

export default meta;

const BASE_ELEMENT: TElement = {
    id: "first-name",
    internalId: "id1",
    label: "First name",
    type: EElementType.EMAIL,
};

const FOCUSED_ELEMENT: IFocusedElement = {
    element: {
        id: "last-name",
        internalId: "id2",
        label: "Last name",
        type: EElementType.EMAIL,
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
                        elements: {},
                        focusedElement: FOCUSED_ELEMENT,
                        showSidePanel: false,
                        orderedIdentifiers: [],
                    },
                    dispatch: noop,
                }}
            >
                <ElementCard element={BASE_ELEMENT} onClick={noop} />
                <ElementCard element={FOCUSED_ELEMENT.element} onClick={noop} />
            </BuilderContext.Provider>
        );
    },
};

export const ElementSelector: StoryObj<Component> = {
    render: () => {
        return <ElementSelectorCard type={EElementType.EMAIL} onClick={noop} />;
    },
};
