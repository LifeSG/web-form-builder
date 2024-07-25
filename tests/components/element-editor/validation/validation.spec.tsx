import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { Validation } from "src/components/element-editor/validation/validation";
import { EElementType, EValidationType } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("Validation", () => {
    beforeEach(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should contain the component with the title, buttonLabel & children being passed into it", () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_TEXT_BASED_ELEMENT(EElementType.EMAIL),
                    isDirty: true,
                },
            },
            formContext: {
                elementType: EElementType.EMAIL,
            },
        });
        expect(screen.getByText("Additional Validation")).toBeInTheDocument();
        expect(getAddValidationButton()).toBeInTheDocument();
    });

    it("should fire onAdd and render the validation-child component when the button is being clicked", () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_TEXT_BASED_ELEMENT(EElementType.EMAIL),
                    isDirty: true,
                },
            },
            formContext: {
                elementType: EElementType.EMAIL,
            },
        });
        fireEvent.click(getAddValidationButton());
        expect(
            screen.getByRole("button", {
                name: EValidationType.EMAIL_DOMAIN,
            })
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(
                "Enter email domain, separating with a comma"
            )
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
        expect(getAddValidationButton()).toBeDisabled();
    });

    it("should disable the button and show a popover when a maximum number of entries is reached when the inputs are filled up", async () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_TEXT_BASED_ELEMENT(EElementType.EMAIL),
                    isDirty: true,
                },
            },
            formContext: {
                elementType: EElementType.EMAIL,
            },
        });
        fireEvent.click(getAddValidationButton());
        const inputName = screen.getByPlaceholderText(
            "Enter email domain, separating with a comma"
        );
        const inputValue = screen.getByPlaceholderText("Set error message");

        fireEvent.change(inputName, { target: { value: "@gmail.com" } });
        fireEvent.change(inputValue, { target: { value: "Test Value" } });
        fireEvent.mouseOver(getAddValidationButton());

        const popoverText = await screen.findByTestId("add-button-popover");
        expect(popoverText).toBeVisible();
        expect(
            screen.getByText(
                "Limit reached. To add new validation, remove existing ones first."
            )
        ).toBeInTheDocument();
        expect(getAddValidationButton()).toBeDisabled();
    });

    it("should disable the button and show a popover when for other element types", async () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: {
                        ...MOCK_TEXT_BASED_ELEMENT(EElementType.TEXT),
                        type: EElementType.TEXT,
                    },
                    isDirty: true,
                },
                selectedElementType: EElementType.TEXT,
            },
            formContext: {
                elementType: EElementType.TEXT,
            },
        });

        fireEvent.click(getAddValidationButton());
        fireEvent.mouseOver(getAddValidationButton());

        const popoverText = await screen.findByTestId("add-button-popover");
        expect(popoverText).toBeVisible();
        expect(
            screen.getByText(
                "To add new validation, fill up existing validation first."
            )
        ).toBeInTheDocument();
        expect(getAddValidationButton()).toBeDisabled();
    });
    it("should remove the validation option when min or max length validation has been used.", async () => {
        setupJestCanvasMock();
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: {
                        ...MOCK_TEXT_BASED_ELEMENT(EElementType.TEXT),
                        type: EElementType.TEXT,
                    },
                    isDirty: true,
                },
            },
            formContext: {
                elementType: EElementType.TEXT,
            },
        });

        fireEvent.click(getAddValidationButton());

        const inputValidationType = screen.getByRole("button", {
            name: "Select",
        });
        fireEvent.click(inputValidationType);

        const option = screen.getByText(EValidationType.MIN_LENGTH);
        fireEvent.click(option);

        const inputName = screen.getByPlaceholderText("Enter rule");
        fireEvent.change(inputName, { target: { value: "2" } });

        const inputValue = screen.getByPlaceholderText("Set error message");
        fireEvent.change(inputValue, { target: { value: "Test Value" } });

        fireEvent.click(getAddValidationButton());

        fireEvent.click(inputValidationType);

        const option2 = screen.getAllByTestId("list-item");
        expect(option2.length).toBe(2);
    });

    it("should hide the validation rule when the element is a numeric field and the selected validation type is whole numbers", async () => {
        setupJestCanvasMock();
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: {
                        ...MOCK_TEXT_BASED_ELEMENT(EElementType.NUMERIC),
                        type: EElementType.NUMERIC,
                    },
                    isDirty: true,
                },
            },
        });

        fireEvent.click(getAddValidationButton());

        const inputValidationType = screen.getByRole("button", {
            name: "Select",
        });
        fireEvent.click(inputValidationType);

        const option = screen.getByText(EValidationType.WHOLE_NUMBERS);
        fireEvent.click(option);

        const inputName = screen.queryByPlaceholderText("Enter rule");
        expect(inputName).not.toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return <Validation />;
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};

const getAddValidationButton: () => HTMLElement = () =>
    screen.getByRole("button", { name: "Add validation" });

// =============================================================================
// MOCKS
// =============================================================================
const MOCK_TEXT_BASED_ELEMENT = (elementType: EElementType) => {
    return {
        internalId: "mock123",
        type: elementType,
        id: "mockElement",
        required: false,
        label: ELEMENT_BUTTON_LABELS[elementType],
        validation: [],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    };
};
