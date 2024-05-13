import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { ConditionalRendering } from "src/components/element-editor/conditional-rendering";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("ConditionalRendering", () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should contain the multi entry component with the title, buttonLabel & children being passed into it", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
                elements: MOCK_ELEMENTS,
            },
        });
        expect(screen.getByText("Conditional Rendering")).toBeInTheDocument();
        expect(screen.getByText("Add condition")).toBeInTheDocument();
    });

    it("should fire onAdd and render the condition-child component when the button is being clicked", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
                elements: MOCK_ELEMENTS,
            },
        });
        fireEvent.click(
            screen.getByRole("button", {
                name: "Add condition",
            })
        );

        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByText("Equals")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Set value")).toBeInTheDocument();
    });

    it("should disable the add button when there is only one element in the elements list", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
                elements: MOCK_ONE_ELEMENT,
            },
        });

        const getAddButton = screen.getByRole("button", {
            name: "Add condition",
        });
        expect(getAddButton).toBeInTheDocument();
        expect(getAddButton).toBeDisabled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });
    return (
        <FormProvider {...methods}>
            <ConditionalRendering />
        </FormProvider>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_ELEMENT = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    validation: [],
    conditionalRendering: [],
};

const MOCK_ELEMENTS = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        validation: [],
        conditionalRendering: [],
    },
    mock246: {
        internalId: "mock246",
        type: EElementType.TEXT,
        id: "mockShorText",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
        validation: [],
        conditionalRendering: [],
    },
};

const MOCK_ONE_ELEMENT = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
        validation: [],
        conditionalRendering: [],
    },
};
