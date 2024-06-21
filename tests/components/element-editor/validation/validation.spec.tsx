import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { Validation } from "src/components/element-editor/validation/validation";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS, ELEMENT_VALIDATION_TYPES } from "src/data";
import { SchemaHelper } from "src/schemas";
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

    it("should contain the the component with the title, buttonLabel & children being passed into it", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT, isDirty: true },
            },
        });
        expect(screen.getByText("Validation")).toBeInTheDocument();
        expect(getAddValidationButton()).toBeInTheDocument();
    });

    it("should fire onAdd and render the validation-child component when the button is being clicked", () => {
        renderComponent({
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT, isDirty: true },
            },
        });
        fireEvent.click(getAddValidationButton());
        expect(
            screen.getByRole("button", {
                name: "Email domain",
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
                    element: MOCK_ELEMENT,
                    isDirty: true,
                },
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

    it("should disable the button and show a popover when a maximum number of entries is reached for other element types", async () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: { ...MOCK_ELEMENT, type: EElementType.TEXT },
                    isDirty: true,
                },
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
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    return (
        <FormProvider {...methods}>
            <Validation />
        </FormProvider>
    );
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
const MOCK_ELEMENT = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    validation: [],
};
