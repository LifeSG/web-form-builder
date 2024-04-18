import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { AddElementsPanel } from "src/components/side-panel/add-elements-panel";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "src/data/elements-data"; // Ensure this includes categoryTitle and elementTypes
import { TestHelper } from "src/util/test-helper";

describe("AddElementsPanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("renderCategories", () => {
        it("should render all the element selector cards based on its categories", () => {
            renderComponent();
            ELEMENTS_CATEGORIES.forEach((category) => {
                expect(
                    screen.getByText(category.categoryTitle)
                ).toBeInTheDocument();
                category.elementTypes.forEach((elementType) => {
                    expect(
                        screen.getAllByText(ELEMENT_BUTTON_LABELS[elementType])
                    ).toHaveLength(1);
                });
            });
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <AddElementsPanel />)
    );
};
