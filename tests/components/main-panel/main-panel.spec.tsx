import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { MainPanel } from "src/components";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("MainPanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should display the empty panel content if there are no elements in the panel", async () => {
        renderComponent();
        const emptyPanelContent = await screen.findByTestId("empty-content");
        expect(emptyPanelContent).toBeInTheDocument();
    });

    it("should display the elements", async () => {
        renderComponent({
            builderContext: {
                orderedIdentifiers: [MOCK_ORDERED_IDENTIFIER],
                elements: MOCK_ELEMENT,
            },
        });
        await expect(getElementContent()).resolves.toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <MainPanel />));
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
        size: "full",
        label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    },
};
