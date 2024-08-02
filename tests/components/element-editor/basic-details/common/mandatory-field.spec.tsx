import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { MandatoryField } from "src/components/element-editor/basic-details/common";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("Basic Details Mandatory Field Component", () => {
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

    it("should not render error message field if required is toggled to false", () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_FOCUSED_ELEMENT,
                },
            },
        });

        expect(screen.getByText("Error message")).toBeInTheDocument();

        const toggleNoButton = screen.getByLabelText("No");
        fireEvent.click(toggleNoButton);

        expect(screen.queryByText("Error message")).toBeNull();
    });

    it("should display error message if error message field is empty", async () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_FOCUSED_ELEMENT,
                },
            },
        });
        const errorMessageInput = await screen.findByPlaceholderText(
            "Enter error message"
        );
        fireEvent.focus(errorMessageInput);
        fireEvent.change(errorMessageInput, { target: { value: "" } });
        fireEvent.blur(errorMessageInput);
        const errorMessage = await screen.findByText("Error message required.");
        expect(errorMessage).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MandatoryField />)
    );
};

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: true,
    requiredErrorMsg: "Error message",
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
};
