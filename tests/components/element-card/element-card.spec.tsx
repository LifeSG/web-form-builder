import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ElementCard } from "src/components";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data/elements-data";
import { TestHelper } from "src/util/test-helper";

const mockDeleteElement = jest.fn();

jest.mock("src/context-providers/builder/hook.ts", () => {
    const actual = jest.requireActual("src/context-providers/builder/hook.ts");
    return {
        useBuilder: () => ({
            ...actual.useBuilder(),
            deleteElement: mockDeleteElement,
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
            fireEvent.click(getElementCard() as HTMLElement);
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
