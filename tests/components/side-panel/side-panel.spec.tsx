import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { SidePanel } from "src/components";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("SidePanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("rendering of the toolbar", () => {
        it("should display the toolbar when there is no focused element", () => {
            renderComponent();
            expect(getToolbar()).toBeInTheDocument();
        });

        it("should not display the toolbar when there is a focused element", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_ELEMENT,
                    },
                },
            });
            expect(getToolbar()).not.toBeInTheDocument();
        });
    });

    describe("rendering of the panel content", () => {
        it("should display the content of the side panel based on the mode given", () => {
            renderComponent();
            expect(getAddElementsPanel()).toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <SidePanel />));
};

const getToolbar = () => screen.queryByTestId("toolbar");

const getAddElementsPanel = () => screen.getByTestId("add-elements-panel");

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_ELEMENT = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
};
