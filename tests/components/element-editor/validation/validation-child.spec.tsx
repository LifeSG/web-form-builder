import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ValidationChild } from "src/components/element-editor/validation";
import { EElementType } from "src/context-providers";
import { ELEMENT_VALIDATION_TYPES } from "src/data";
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
            index: mockIndex,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter rule")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Set error message")
        ).toBeInTheDocument();
    });

    it("should render fields with prefilled values when values are provided", () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        validation: mockValue,
                    },
                },
            }
        );
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
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        validation: mockValue,
                    },
                },
            }
        );
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render the validation type field as disabled when there is only 1 option", () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: ["Option 1"],
                index: mockIndex,
            },
            {
                builderContext: {
                    focusedElement: {
                        element: {
                            type: EElementType.EMAIL,
                            label: "mock",
                            required: true,
                            columns: {
                                desktop: 12,
                                tablet: 8,
                                mobile: 4,
                            } as const,
                            id: "mockId",
                            internalId: "mockId1",
                        },
                    },
                },
                formContext: {
                    currentValues: {
                        validation: mockValue,
                    },
                },
            }
        );
        const getValidationTypeField = screen.getByRole("button", {
            name: "Option 1",
        });
        expect(getValidationTypeField).toBeInTheDocument();
        expect(getValidationTypeField).toBeDisabled();
    });

    it("should render an error message when validation rule field input is invalid", async () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockEmailValidationOptions,
                index: mockIndex,
            },
            {
                builderContext: {
                    focusedElement: {
                        element: {
                            type: EElementType.EMAIL,
                            label: "mock",
                            required: true,
                            columns: {
                                desktop: 12,
                                tablet: 8,
                                mobile: 4,
                            } as const,
                            id: "mockId",
                            internalId: "mockId1",
                        },
                    },
                },
                formContext: {
                    currentValues: {
                        validation: mockEmailValidationValue,
                    },
                },
            }
        );
        const getValidationRuleField =
            screen.getByPlaceholderText("Enter rule");
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
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockEmailValidationOptions,
                index: mockIndex,
            },
            {
                builderContext: {
                    focusedElement: {
                        element: {
                            type: EElementType.EMAIL,
                            label: "mock",
                            required: true,
                            columns: {
                                desktop: 12,
                                tablet: 8,
                                mobile: 4,
                            } as const,
                            id: "mockId",
                            internalId: "mockId1",
                        },
                    },
                },
                formContext: {
                    currentValues: {
                        validation: mockEmptyEmailValidationValue,
                    },
                },
            }
        );
        const getValidationRuleField =
            screen.getByPlaceholderText("Enter rule");
        fireEvent.focus(getValidationRuleField);
        fireEvent.blur(getValidationRuleField);
        const validationRuleError = await screen.findByText(
            "Email domain required."
        );
        expect(validationRuleError).toHaveTextContent("Email domain required.");
    });

    it("should render an error message when validation fields are left empty", async () => {
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
            },
            {
                formContext: {
                    currentValues: {
                        validation: mockEmptyValue,
                    },
                },
            }
        );
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
    index?: number;
};

const MyTestComponent = ({
    validationChildOptions = {},
}: { validationChildOptions?: ValidationChildOptions } = {}) => {
    const { onDelete, options, index } = validationChildOptions;
    return (
        <>
            <ValidationChild
                onDelete={onDelete}
                options={options}
                index={index}
            />
            <button type="submit">Submit</button>
        </>
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
const mockValue = [
    {
        validationType: "Option 1",
        validationRule: "mockRule",
        validationErrorMessage: "mockErrorMessage",
    },
];

const mockEmptyValue = [
    {
        validationType: "",
        validationRule: "",
        validationErrorMessage: "",
    },
];

const mockEmailValidationValue = [
    {
        validationType:
            ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
                .validationTypes[0],
        validationRule: "mockRule",
        validationErrorMessage: "mockErrorMessage",
    },
];

const mockEmptyEmailValidationValue = [
    {
        validationType:
            ELEMENT_VALIDATION_TYPES["Text field"][EElementType.EMAIL]
                .validationTypes[0],
        validationRule: "",
        validationErrorMessage: "mockErrorMessage",
    },
];

const mockIndex = 0;
