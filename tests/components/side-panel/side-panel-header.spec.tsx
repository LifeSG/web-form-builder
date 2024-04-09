import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { SidePanelHeader } from "src/components/side-panel/side-panel-header";
import { EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper, mockBuilderState } from "src/util/test-helper";

const mockElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
};

describe("side-panel-header", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("getHeaderTitle", () => {
        it("should run the getHeaderTitle function according to the mode given", () => {
            renderComponent();
            expect(getHeaderLabel().textContent).toEqual("Add elements");
        });

        it("should display the edit element header title when there is a focusedElement", () => {
            renderComponent({
                builderContext: {
                    ...mockBuilderState,
                    focusedElement: {
                        element: mockElement,
                    },
                },
            });
            expect(getHeaderLabel().textContent).toEqual("Edit details");
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <SidePanelHeader />)
    );
};

const getHeaderLabel = () => screen.getByTestId("header-label");
