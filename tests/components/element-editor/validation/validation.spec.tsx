import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { setupJestCanvasMock } from "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { Validation } from "src/components/element-editor/validation/validation";
import { EElementType, IColumns } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
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
        renderComponent(EElementType.EMAIL, {
            builderContext: {
                focusedElement: { element: MOCK_ELEMENT, isDirty: true },
            },
        });
        expect(screen.getByText("Validation")).toBeInTheDocument();
        expect(getAddValidationButton()).toBeInTheDocument();
    });

    it("should fire onAdd and render the validation-child component when the button is being clicked", () => {
        renderComponent(EElementType.EMAIL, {
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
        renderComponent(EElementType.EMAIL, {
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

    it("should disable the button and show a popover when for other element types", async () => {
        renderComponent(EElementType.TEXT, {
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
    it("should disable the button and show a popover when a maximum number of entries is reached for other element types", async () => {
        setupJestCanvasMock();
        renderComponent(EElementType.TEXT, {
            builderContext: {
                focusedElement: {
                    element: {
                        ...MOCK_ELEMENT,
                        type: EElementType.TEXT,
                    },
                    isDirty: true,
                },
            },
        });

        fireEvent.click(getAddValidationButton());
        const inputValidationType = screen.getByRole("button", {
            name: "Select",
        });
        const inputName = screen.getByPlaceholderText("Enter rule");
        const inputValue = screen.getByPlaceholderText("Set error message");

        fireEvent.click(inputValidationType);
        fireEvent.click(screen.getAllByText("Minimum length")[0]);
        fireEvent.change(inputName, { target: { value: "2" } });
        fireEvent.change(inputValue, { target: { value: "Test Value" } });
        fireEvent.click(getAddValidationButton());

        const inputValidationType2 = screen.getByRole("button", {
            name: "Select",
        });
        const inputName2 = screen.getAllByPlaceholderText("Enter rule")[1];
        const inputValue2 =
            screen.getAllByPlaceholderText("Set error message")[1];

        fireEvent.click(inputValidationType2);
        fireEvent.click(screen.getAllByText("Minimum length")[1]);
        fireEvent.change(inputName2, { target: { value: "3" } });
        fireEvent.change(inputValue2, { target: { value: "Test Value" } });

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
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = ({ elementType }: { elementType: EElementType }) => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(elementType)),
    });

    return (
        <FormProvider {...methods}>
            <Validation />
        </FormProvider>
    );
};

const renderComponent = (
    element: EElementType,
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent elementType={element} />
        )
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
    columns: { desktop: 12, tablet: 8, mobile: 4 } as IColumns,
};
