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
                        orderedIdentifiers: [
                            {
                                internalId: MOCK_ELEMENT.internalId,
                                position: 0,
                                size: "full",
                            },
                        ],
                    },
                }
            );
            expect(getDuplicateButton()).toBeInTheDocument();
            expect(getDeleteButton()).toBeInTheDocument();
        });

        it("should not show the duplicate and delete buttons when in focused state if element is disabled", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    configContext: {
                        elements: {
                            "Email address": {
                                isDisabled: true,
                            },
                        },
                    },
                    builderContext: {
                        focusedElement: { element: MOCK_ELEMENT },
                    },
                }
            );
            expect(getDuplicateButton(true)).not.toBeInTheDocument();
            expect(getDeleteButton(true)).not.toBeInTheDocument();
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
                        orderedIdentifiers: [
                            {
                                internalId: MOCK_ELEMENT.internalId,
                                position: 0,
                                size: "full",
                            },
                        ],
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
                        orderedIdentifiers: [
                            {
                                internalId: MOCK_ELEMENT.internalId,
                                position: 0,
                                size: "full",
                            },
                        ],
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
                        orderedIdentifiers: [
                            {
                                internalId: MOCK_ELEMENT.internalId,
                                position: 0,
                                size: "full",
                            },
                        ],
                    },
                }
            );
            const duplicateButton = getDuplicateButton();
            fireEvent.click(duplicateButton);
            expect(mockDuplicateElement).toBeCalled();
            expect(mockDuplicateElement).toHaveBeenCalledWith(MOCK_ELEMENT);
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

        it("should not render the drag handle when hovering over the element card of a disabled element", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    configContext: {
                        elements: {
                            "Email address": {
                                isDisabled: true,
                            },
                        },
                    },
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
            expect(screen.queryByTestId("drag-handle")).not.toBeInTheDocument();
        });
    });

    describe("hiding of form fields based on Form Builder Config", () => {
        it("should not hide the id label in the element card if shouldShow of ID is not specified in config", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                        },
                    },
                }
            );

            expect(screen.getByText(`ID: ${MOCK_ID}`)).toBeInTheDocument();
        });

        it("should hide the id label in the element card if shouldShow of ID is set to false in config", () => {
            renderComponent(
                { element: MOCK_ELEMENT },
                {
                    configContext: {
                        attributes: {
                            id: {
                                shouldShow: false,
                            },
                        },
                    },
                    builderContext: {
                        focusedElement: {
                            element: MOCK_ELEMENT,
                        },
                    },
                }
            );

            expect(
                screen.queryByText(`ID: ${MOCK_ID}`)
            ).not.toBeInTheDocument();
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
const MOCK_ID = "mockId";

const MOCK_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: MOCK_ID,
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
};

const mockOnClick = jest.fn();
