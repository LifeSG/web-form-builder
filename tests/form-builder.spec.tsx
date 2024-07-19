import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormBuilder } from "src/form-builder";
import { TestHelper } from "src/util/test-helper";

// Mock the window object
const mockWindow = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
    });
};

describe("FormBuilder component", () => {
    it("renders large screen content when the screen size is large", () => {
        mockWindow(1200);
        renderComponent();
        expect(screen.getByText("Form is empty")).toBeInTheDocument();
        expect(
            screen.queryByText("Screen size not supported")
        ).not.toBeInTheDocument();
    });

    it("renders small screen content when the screen size is small", () => {
        mockWindow(1000);
        renderComponent();
        expect(
            screen.getByText("Screen size not supported")
        ).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <FormBuilder />));
};
