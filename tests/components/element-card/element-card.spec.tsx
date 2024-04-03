import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ElementCard } from "src/components";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

const mockElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
};

const mockOnClick = jest.fn();

describe("element-card component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("element-card", () => {
        it("should be in a focused state and show the edit element panel when clicked on", () => {
            renderComponent({ element: mockElement, onClick: mockOnClick });
            fireEvent.click(getElementCard() as HTMLElement);
            expect(mockOnClick).toHaveBeenCalled();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (
    options: {
        element?: TElement;
        onClick?: () => void;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { element, onClick } = options;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ElementCard element={element} onClick={onClick} />
        )
    );
};

const getElementCard = () => screen.getByRole("button");
