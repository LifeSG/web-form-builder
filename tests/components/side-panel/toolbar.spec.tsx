import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Toolbar } from "src/components/side-panel/toolbar";
import { TestHelper } from "src/util/test-helper";

describe("ToolBar", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should expand toggle panel if it is collapsed on clicking the mode button", () => {
        renderComponent({
            builderContext: {
                showSidePanel: false,
            },
        });
        fireEvent.click(getIconButton());
        expect(mockTogglePanel).toHaveBeenCalledWith(true);
        expect(mockToggleMode).toHaveBeenCalled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Toolbar />));
};

const getIconButton = () => {
    return screen.getByTestId("add-element");
};

// =============================================================================
// MOCKS
// =============================================================================

const mockTogglePanel = jest.fn();
const mockToggleMode = jest.fn();

jest.mock("src/context-providers/builder/hook.ts", () => {
    return {
        useBuilder: () => ({
            toggleMode: mockToggleMode,
            togglePanel: mockTogglePanel,
        }),
    };
});
