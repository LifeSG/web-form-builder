import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Id } from "src/components/element-editor/basic-details/common";
import { TestHelper } from "src/util/test-helper";

describe("Basic Details Id Component", () => {
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

        const idInput = await screen.findByPlaceholderText("Create an ID");
        fireEvent.focus(idInput);
        fireEvent.change(idInput, { target: { value: null } });
        fireEvent.blur(idInput);
        const errorMessage = await screen.findByText("ID required.");
        expect(errorMessage).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Id />));
};
