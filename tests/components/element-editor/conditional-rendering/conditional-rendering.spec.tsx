import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { ConditionalRendering } from "src/components/element-editor/conditional-rendering";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
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

    it("should disable the add button when there is only one element in the main panel", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
                elements: { [MOCK_ELEMENT.internalId]: MOCK_ELEMENT },
            },
        });

        const getAddButton = screen.getByRole("button", {
            name: "Add condition",
        });
        expect(getAddButton).toBeInTheDocument();
        expect(getAddButton).toBeDisabled();
    });

    it("should render other elements labels and ids as options other than the selected element", async () => {
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
        fireEvent.click(screen.getByText("Select"));

        await waitFor(() => {
            const element = screen.queryByRole("list", {
                name: `${ELEMENT_BUTTON_LABELS[EElementType.EMAIL]} ID: mockElement`,
            });
            expect(element).not.toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <ConditionalRendering />;
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
    columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
};

const MOCK_ELEMENTS = {
    mock123: MOCK_ELEMENT,
    mock246: {
        internalId: "mock246",
        type: EElementType.TEXT,
        id: "mockShorText",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.TEXT],
        validation: [],
        conditionalRendering: [],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    },
};
