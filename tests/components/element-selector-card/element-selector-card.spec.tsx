import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ElementSelectorCard } from "src/components/element-selector-card";
import { EElementType } from "src/context-providers/builder";
import { TestHelper } from "src/util/test-helper";

const mockOnClick = jest.fn();
describe("element-selector-panel", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });
    describe("onClick", () => {
        it("should run the onClick function when the card is clicked on", () => {
            renderComponent({
                type: EElementType.EMAIL,
                onClick: mockOnClick,
            });
            fireEvent.click(getElementSelectorCard() as HTMLElement);
            expect(mockOnClick).toHaveBeenCalled();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (
    options: {
        type?: EElementType;
        onClick?: () => void;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { type, onClick } = options;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ElementSelectorCard type={type} onClick={onClick} />
        )
    );
};

const getElementSelectorCard = () => screen.getByRole("button");
