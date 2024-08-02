import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { LabelField } from "src/components/element-editor/basic-details/common";
import { TestHelper } from "src/util/test-helper";

describe("Basic Details Label Component", () => {
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

    it("should display error message if field is touched and left empty", async () => {
        renderComponent();

        const labelInput =
            await screen.findByPlaceholderText("Enter element name");
        fireEvent.focus(labelInput);
        fireEvent.change(labelInput, { target: { value: null } });
        fireEvent.blur(labelInput);
        const errorMessage = await screen.findByText("Label required.");
        expect(errorMessage).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <LabelField />));
};
