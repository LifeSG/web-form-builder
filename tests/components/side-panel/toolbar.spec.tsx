import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Toolbar } from "src/components/side-panel/toolbar";
import { TestHelper, mockBuilderState } from "src/util/test-helper";

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

describe("toolbar", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("testing the viewToggleMode()", () => {
        it("should display the relevant mode when toggleView function is called", () => {
            renderComponent({
                builderContext: {
                    ...mockBuilderState,
                },
            });
            fireEvent.click(getIconButton());
            expect(mockTogglePanel).toHaveBeenCalledWith(true);
            expect(mockToggleMode).toHaveBeenCalled();
        });

        it("should run the toggle panel hook when the panel is not being shown", () => {
            renderComponent({
                builderContext: {
                    ...mockBuilderState,
                    showSidePanel: false,
                },
            });
            fireEvent.click(getIconButton());
            expect(mockTogglePanel).not.toHaveBeenCalledWith();
            expect(mockToggleMode).toHaveBeenCalled();
        });
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
