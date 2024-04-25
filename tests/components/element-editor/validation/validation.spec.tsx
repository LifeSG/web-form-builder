import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Validation } from "src/components/element-editor/validation/validation";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("Validation", () => {
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

    it("should contain the the component with the title, buttonLabel & children being passed into it", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
            },
        });
        console.log(screen.debug());
        expect(screen.getByText("Validation")).toBeInTheDocument();
        expect(screen.getByText("Add validation")).toBeInTheDocument();
    });

    it("should run onAdd and render the validation-child component when the button is being clicked", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT },
            },
        });
        console.log(screen.debug());
        fireEvent.click(
            screen.getByRole("button", {
                name: "Add validation",
            })
        );

        expect(
            screen.getByRole("button", {
                name: "Valid email address format",
            })
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Validation />));
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
};
