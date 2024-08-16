import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ElementSelectorCard } from "src/components/element-selector-card";
import { EElementType } from "src/context-providers/builder";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";

describe("ElementSelectorCard", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    test.each`
        type                     | expectedLabel
        ${EElementType.CONTACT}  | ${ELEMENT_BUTTON_LABELS[EElementType.CONTACT]}
        ${EElementType.EMAIL}    | ${ELEMENT_BUTTON_LABELS[EElementType.EMAIL]}
        ${EElementType.NUMERIC}  | ${ELEMENT_BUTTON_LABELS[EElementType.NUMERIC]}
        ${EElementType.TEXT}     | ${ELEMENT_BUTTON_LABELS[EElementType.TEXT]}
        ${EElementType.TEXTAREA} | ${ELEMENT_BUTTON_LABELS[EElementType.TEXTAREA]}
    `(
        "should render the label according to the type provided",
        ({ type, expectedLabel }) => {
            renderComponent({
                type: type,
                onClick: mockOnClick,
            });
            expect(screen.getByText(expectedLabel)).toBeInTheDocument();
        }
    );
    it("should fire the onClick callback when the card is clicked", () => {
        renderComponent({
            type: EElementType.EMAIL,
            onClick: mockOnClick,
        });
        fireEvent.click(getElementSelectorCard() as HTMLElement);
        expect(mockOnClick).toHaveBeenCalled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (
    options: {
        type?: EElementType;
        onClick?: () => void;
    } = {}
) => {
    const { type, onClick } = options;
    return render(<ElementSelectorCard type={type} onClick={onClick} />);
};

const getElementSelectorCard = () => screen.getByRole("button");

// =============================================================================
// MOCKS
// =============================================================================
const mockOnClick = jest.fn();
