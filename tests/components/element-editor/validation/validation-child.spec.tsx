import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { ValidationChild } from "src/components/element-editor/validation";
import { EElementType, IValidation } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("ValidationChild", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the component with provided options and fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockEmptyValue,
            index: mockIndex,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });

    it("should render fields with prefilled values when values are provided", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
            index: mockIndex,
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Option 1",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(screen.getByDisplayValue("mockRule")).toBeInTheDocument();
        expect(
            screen.getByDisplayValue("mockErrorMessage")
        ).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
            index: mockIndex,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render the validation type field as disabled when there is only 1 option", () => {
        renderComponent({
            onDelete: mockDelete,
            options: ["Option 1"],
            onChange: mockOnChange,
            value: mockValue,
            index: mockIndex,
        });
        const getValidationTypeField = screen.getByRole("button", {
            name: "Option 1",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(getValidationTypeField).toBeDisabled();
    });

    it("should fire onChange when there is a change in the input fields", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
            index: mockIndex,
        });
        const getValidationRuleField =
            screen.getByPlaceholderText("Enter rule");
        fireEvent.focus(getValidationRuleField);
        fireEvent.change(getValidationRuleField, {
            target: { value: "camel_Case" },
        });
        expect(mockOnChange).toBeCalled();
    });

    it("should render an error message when validation rule field input is invalid", async () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockEmailValidationOptions,
            onChange: mockOnChange,
            value: mockEmailValidationValue,
            index: mockIndex,
        });
        const getValidationRuleField = screen.getByPlaceholderText(
            "Enter email domain, seperating with a comma"
        );
        fireEvent.focus(getValidationRuleField);
        fireEvent.blur(getValidationRuleField);
        const validationRuleError = await screen.findByText(
            "Invalid email domain. Check if email domain is correct with no whitespace between characters. Separate each with a comma if there is more than 1 email."
        );
        expect(validationRuleError).toHaveTextContent(
            "Invalid email domain. Check if email domain is correct with no whitespace between characters. Separate each with a comma if there is more than 1 email."
        );
    });

    it("should render an error message when validation rule field for the email element is left empty", async () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockEmailValidationOptions,
            onChange: mockOnChange,
            value: mockEEmptyEmailValidationValue,
            index: mockIndex,
        });
        const getValidationRuleField = screen.getByPlaceholderText(
            "Enter email domain, seperating with a comma"
        );
        fireEvent.focus(getValidationRuleField);
        fireEvent.blur(getValidationRuleField);
        const validationRuleError = await screen.findByText(
            "Email domain required."
        );
        expect(validationRuleError).toHaveTextContent("Email domain required.");
    });

    it("should render an error message when validation error message field is left empty", async () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockEmptyValue,
            index: mockIndex,
        });
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);
        const validationError = await screen.findByText("Validation required.");
        const validationRuleError = await screen.findByText(
            "Validation rule required."
        );
        const validationErrorMessageError = await screen.findByText(
            "Error message required."
        );
        expect(validationError).toHaveTextContent("Validation required.");
        expect(validationRuleError).toHaveTextContent(
            "Validation rule required."
        );
        expect(validationErrorMessageError).toHaveTextContent(
            "Error message required."
        );
    });
});

type ValidationChildOptions = {
    onDelete?: () => void;
    options?: string[];
    onChange?: (newValue: any) => void;
    value?: IValidation;
    index?: number;
};

const MyTestComponent = ({
    validationChildOptions = {},
}: { validationChildOptions?: ValidationChildOptions } = {}) => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    const { onDelete, options, onChange, value, index } =
        validationChildOptions;
    const onSubmit = jest.fn;
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ValidationChild
                    onDelete={onDelete}
                    options={options}
                    onChange={onChange}
                    value={value}
                    index={index}
                />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

const renderComponent = (
    validationChildOptions: ValidationChildOptions = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent validationChildOptions={validationChildOptions} />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockOptions = ["Option 1", "Option 2"];

const mockEmailValidationOptions =
    ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL].validationTypes;
const mockDelete = jest.fn();
const mockOnChange = jest.fn();
const mockValue = {
    validationType: "Option 1",
    validationRule: "mockRule",
    validationErrorMessage: "mockErrorMessage",
};

const mockEmptyValue = {
    validationType: "",
    validationRule: "",
    validationErrorMessage: "",
};

const mockEmailValidationValue = {
    validationType:
        ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
            .validationTypes[0],
    validationRule: "mockRule",
    validationErrorMessage: "mockErrorMessage",
};

const mockEEmptyEmailValidationValue = {
    validationType:
        ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
            .validationTypes[0],
    validationRule: "",
    validationErrorMessage: "mockErrorMessage",
};

const mockIndex = 1;
