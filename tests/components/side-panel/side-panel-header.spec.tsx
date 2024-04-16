import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { SidePanelHeader } from "src/components/side-panel/side-panel-header";
import { EBuilderMode, EElementType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

describe("SidePanelHeader", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("getHeaderTitle & conditoal rendering of the cross button", () => {
        it("should run the getHeaderTitle function and display the Add Elements title for the add-elements mode", () => {
            renderComponent();
            expect(getHeaderLabel().textContent).toEqual("Add elements");
        });

        it("should run the getHeaderTitle function and display the Add Pages title for the add-pages mode", () => {
            renderComponent({
                builderContext: {
                    mode: EBuilderMode.EDIT_PAGES,
                },
            });
            expect(getHeaderLabel().textContent).toEqual("Add pages");
        });

        it("should display the edit element header title when there is a focusedElement", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                    },
                },
            });
            expect(getHeaderLabel().textContent).toEqual("Edit details");
        });
        it("should display the cross button when there is a focused element", () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: mockElement,
                    },
                },
            });
            expect(getCrossButton()).toBeInTheDocument();
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
const getCrossButton = () => screen.getByTestId("cross-button");

// =============================================================================
// MOCKS
// =============================================================================
const mockElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
};
