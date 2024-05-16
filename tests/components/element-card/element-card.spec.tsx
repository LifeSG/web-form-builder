import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ElementCard } from "src/components";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

const mockDeleteElement = jest.fn();
const mockDuplicateElement = jest.fn();

jest.mock("src/context-providers/builder/hook.ts", () => {
    const actual = jest.requireActual("src/context-providers/builder/hook.ts");
    return {
        useBuilder: () => ({
            ...actual.useBuilder(),
            deleteElement: mockDeleteElement,
            duplicateElement: mockDuplicateElement,
        }),
    };
});

describe("ElementCard", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    describe("onClick", () => {
        it("should fire the onClick callback when clicked", () => {
            renderComponent(
                { element: MOCK_ELEMENT, onClick: mockOnClick },
                {}
            );
            fireEvent.click(getElementCard());
            expect(mockOnClick).toHaveBeenCalled();
        });
    });

    describe("rendering of duplicate & delete button", () => {
        it("should not show the duplicate and delete buttons when in normal state", () => {
            renderComponent({ element: MOCK_ELEMENT });
            expect(getDuplicateButton(true)).not.toBeInTheDocument();
            expect(getDeleteButton(true)).not.toBeInTheDocument();
        });

        it("should show the duplicate and delete buttons when in focused state", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: { element: MOCK_ELEMENT },
                    },
                }
            );
            expect(getDuplicateButton()).toBeInTheDocument();
            expect(getDeleteButton()).toBeInTheDocument();
        });
        it("should disable the duplicate button when the current element is in focus", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                            isDirty: true,
                            isValid: false,
                        },
                    },
                }
            );
            expect(getDuplicateButton()).toBeInTheDocument();
            expect(getDuplicateButton()).toBeDisabled();
        });

        it("should run the deleteElement hook when clicking the delete button", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: { element: MOCK_ELEMENT },
                    },
                }
            );
            const deleteButton = getDeleteButton();
            fireEvent.click(deleteButton);
            expect(mockDeleteElement).toBeCalled();
        });

        it("should run the duplicateElement hook when clicking the duplicate button", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                            isDirty: false,
                        },
                    },
                }
            );
            const duplicateButton = getDuplicateButton();
            fireEvent.click(duplicateButton);
            expect(mockDuplicateElement).toBeCalled();
        });
    });

    describe("drag & drop functionality", () => {
        it("should render the drag handle when hovering over the element card", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                            isDirty: true,
                            isValid: false,
                        },
                    },
                }
            );
            fireEvent.mouseEnter(getElementCard());
            expect(screen.getByTestId("drag-handle")).toBeInTheDocument();
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

const getElementCard = () =>
    screen.getByTestId(`card${MOCK_ELEMENT.internalId}`);

const getDeleteButton = (useQuery = true) =>
    useQuery
        ? screen.queryByRole("button", { name: "Delete" })
        : screen.getByRole("button", { name: "Delete" });

const getDuplicateButton = (useQuery = false) =>
    useQuery
        ? screen.queryByRole("button", { name: "Duplicate" })
        : screen.getByRole("button", { name: "Duplicate" });

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

const mockOnClick = jest.fn();
