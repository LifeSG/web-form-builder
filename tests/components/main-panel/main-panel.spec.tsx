import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { MainPanel } from "src/components";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper, mockBuilderState } from "src/util/test-helper";

describe("main-panel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("conditional rendering of main panel content", () => {
        it("should display the empty panel content", async () => {
            renderComponent();
            await expect(getEmptyPanelContent()).resolves.toBeInTheDocument();
        });

        it("should display the elements", async () => {
            renderComponent({
                builderContext: {
                    ...mockBuilderState,
                    orderedIdentifiers: [MOCK_ORDERED_IDENTIFIER],
                    elements: MOCK_ELEMENT,
                },
            });
            await expect(getElementContent()).resolves.toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <MainPanel />));
};

const getEmptyPanelContent = async () => {
    const element = await screen.findByTestId("empty-content");
    return element;
};

const getElementContent = async () => {
    const element = await screen.findByTestId("element-content");
    return element;
};

// =============================================================================
// MOCKS
// =============================================================================
const MOCK_ORDERED_IDENTIFIER = {
    internalId: "mock123",
    parentInternalId: "ParentID1",
};

const MOCK_ELEMENT = {
    mock123: {
        internalId: "mock123",
        type: EElementType.EMAIL,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};
