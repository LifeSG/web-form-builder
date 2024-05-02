import { render, screen, fireEvent } from "@testing-library/react";
import "jest-canvas-mock";
import { AddElementsPanel } from "src/components/side-panel/add-elements-panel";
import { EElementType } from "src/context-providers";
import {
    ELEMENTS_CATEGORIES,
    ELEMENT_BUTTON_LABELS,
} from "src/data/elements-data"; // Ensure this includes categoryTitle and elementTypes
import { TestHelper } from "src/util/test-helper";

// =============================================================================
// MOCKS
// =============================================================================
const mockAddElement = jest.fn();
jest.mock("src/context-providers/builder/hook.ts", () => {
    const actual = jest.requireActual("src/context-providers/builder/hook.ts");
    return {
        useBuilder: () => ({
            ...actual.useBuilder(),
            addElement: mockAddElement,
        }),
    };
});

describe("AddElementsPanel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("addElement & renderCategories", () => {
        it("should be able to add an element when clicking on a selector card", () => {
            renderComponent();
            const emailElementButton = screen.getByText(
                ELEMENT_BUTTON_LABELS[EElementType.EMAIL]
            );
            fireEvent.click(emailElementButton);
            expect(mockAddElement).toHaveBeenCalledWith(
                EElementType.EMAIL,
                true
            );
        });
        it("should render all the element selector cards based on its categories", () => {
            renderComponent();
            ELEMENTS_CATEGORIES.forEach((category) => {
                expect(
                    screen.getByText(category.categoryTitle)
                ).toBeInTheDocument();
                category.elementTypes.forEach((elementType) => {
                    expect(
                        screen.getByText(ELEMENT_BUTTON_LABELS[elementType])
                    ).toBeInTheDocument();
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
