import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import "jest-canvas-mock";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { Prefill } from "src/components/element-editor/prefill";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("Prefill", () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should contain the component with the title, buttonLabel & children being passed into it", () => {
        setupJestCanvasMock();
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT, isDirty: true },
            },
        });
        expect(screen.getByText("Prefill")).toBeInTheDocument();
        expect(screen.getByText("Add prefill")).toBeInTheDocument();
    });

    it("should render the prefill-child component and trigger onAdd when the 'Add prefill' button is clicked", async () => {
        setupJestCanvasMock();
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT, isDirty: true },
            },
        });
        fireEvent.click(
            screen.getByRole("button", {
                name: "Add prefill",
            })
        );

        await waitFor(() => {
            expect(
                screen.getByPlaceholderText("Enter a path")
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {
                    name: "Select",
                })
            ).toBeInTheDocument();
            const element = screen.queryByPlaceholderText("Enter an action ID");
            expect(element).not.toBeInTheDocument();
        });
    });

    it("should display the action ID and path input fields when 'Previous source' is selected as the prefill mode", () => {
        setupJestCanvasMock();
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_ELEMENT,
                    isDirty: true,
                },
            },
        });

        fireEvent.click(
            screen.getByRole("button", {
                name: "Add prefill",
            })
        );

        const getPrefillModeField = screen.getByRole("button", {
            name: "Select",
        });

        fireEvent.click(getPrefillModeField);

        const previousSourceOptions = screen.getAllByText("Previous source");
        fireEvent.click(previousSourceOptions[0]);

        expect(
            screen.getByPlaceholderText("Enter an action ID")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter a path")).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: "Previous source",
            })
        ).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <Prefill />;
};

const renderComponent = (overrideOptions) => {
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
    prefill: [],
};
