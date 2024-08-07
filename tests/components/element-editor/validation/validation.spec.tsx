import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { Validation } from "src/components/element-editor/validation/";
import { EElementType, EValidationType } from "src/context-providers";
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

    it("should disable the Add Validation button and show a popover when a maximum number of entries is reached and the inputs are filled up", async () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    type: EElementType.TEXTAREA,
                },
            },
        });
        fireEvent.click(getAddValidationButton());
        const inputName = screen.getByPlaceholderText("Enter rule");
        const inputValue = screen.getByPlaceholderText("Set error message");

        fireEvent.change(inputName, { target: { value: "Test rule" } });
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

    it("should disable the button and show a popover when existing validation is not filled", async () => {
        renderComponent({
            builderContext: {
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
                selectedElementType: EElementType.TEXT,
            },
            formContext: {
                elementType: EElementType.TEXT,
                defaultValues: {
                    type: EElementType.TEXT,
                    validation: [],
                },
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

    describe.each`
        elementType              | testId
        ${EElementType.EMAIL}    | ${"email-validation-child"}
        ${EElementType.TEXT}     | ${"text-validation-child"}
        ${EElementType.TEXTAREA} | ${"long-text-validation-child"}
        ${EElementType.NUMERIC}  | ${"numeric-validation-child"}
        ${EElementType.CONTACT}  | ${"contact-validation-child"}
    `(
        "should render the correct validation child component",
        ({ elementType, testId }) => {
            it(`for ${elementType}`, async () => {
                renderValidationComponent(elementType);
                fireEvent.click(getAddValidationButton());

                expect(screen.getByTestId(testId)).toBeInTheDocument();
            });
        }
    );
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderValidationComponent = (elementType: EElementType) => {
    renderComponent({
        builderContext: {
            selectedElementType: elementType,
        },
        formContext: {
            elementType: elementType,
            defaultValues: {
                type: elementType,
                validation: [],
            },
        },
    });
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Validation />));
};

const getAddValidationButton: () => HTMLElement = () =>
    screen.getByRole("button", { name: "Add validation" });
