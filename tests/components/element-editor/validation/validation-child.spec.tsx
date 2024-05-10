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
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            onChange: mockOnChange,
            value: mockValue,
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
        });
        const getValidationRuleField =
            screen.getByPlaceholderText("Enter rule");
        fireEvent.focus(getValidationRuleField);
        fireEvent.change(getValidationRuleField, {
            target: { value: "camel_Case" },
        });
        expect(mockOnChange).toBeCalled();
    });
});

type ValidationChildOptions = {
    onDelete?: () => void;
    options?: string[];
    onChange?: (newValue: any) => void;
    value?: IValidation;
};

const MyTestComponent = ({
    validationChildOptions = {},
}: { validationChildOptions?: ValidationChildOptions } = {}) => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    const { onDelete, options, onChange, value } = validationChildOptions;
    const onSubmit = jest.fn;
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ValidationChild
                    onDelete={onDelete}
                    options={options}
                    onChange={onChange}
                    value={value}
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
