import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { SidePanel } from "src/components";
import { EBuilderMode, EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper, mockBuilderState } from "src/util/test-helper";

describe("side-panel", () => {
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
                    ...mockBuilderState,
                    focusedElement: {
                        element: MOCK_ELEMENT,
                    },
                },
            });
            expect(getToolbar(false)).not.toBeInTheDocument();
        });
    });

    describe("rendering of the panel content", () => {
        it("should display the content of the side panel based on the mode given", () => {
            renderComponent();
            expect(getAddElementsPanel()).toBeInTheDocument();
        });

        it("should display the default content of the side panel if there is no mode given", () => {
            renderComponent({
                builderContext: {
                    ...mockBuilderState,
                    mode: EBuilderMode.EDIT_ELEMENT,
                },
            });
            expect(getDefaultContent()).toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <SidePanel />));
};

const getToolbar = (useQuery = true) =>
    useQuery ? screen.getByTestId("toolbar") : screen.queryByTestId("toolbar");

const getAddElementsPanel = () => screen.getByTestId("add-elements-panel");
const getDefaultContent = () => screen.getByTestId("default-content");

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
