import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ValidationType } from "src/components/element-editor/validation/common";
import { IValidation } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("ValidationType", () => {
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

    it("should render the validation type field as disabled when there is only 1 option", () => {
        const mockValidationValue: IValidation[] = [
            {
                validationType: "Option 1",
                validationRule: "mockRule",
                validationErrorMessage: "mockErrorMessage",
            },
        ];
        renderComponent(
            {
                options: ["Option 1"],
                index: 0,
            },
            {
                formContext: {
                    currentValues: {
                        validation: mockValidationValue,
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

    it("should render an error message when validation type is left empty", async () => {
        const mockEmptyValidationValue: IValidation[] = [
            {
                validationType: "",
                validationRule: "",
                validationErrorMessage: "",
            },
        ];
        const mockOptions = ["Option 1", "Option 2"];
        renderComponent(
            {
                options: mockOptions,
                index: 0,
            },
            {
                formContext: {
                    currentValues: {
                        validation: mockEmptyValidationValue,
                    },
                },
            }
        );
        const submitButton = screen.getByText("Submit");

        fireEvent.click(submitButton);

        const validationError = await screen.findByText("Validation required.");

        expect(validationError).toBeInTheDocument();
    });
});

interface ValidationTypeOptions {
    options?: string[];
    index?: number;
}

const MyTestComponent = ({
    validationTypeOptions = {},
}: { validationTypeOptions?: ValidationTypeOptions } = {}) => {
    const { options, index } = validationTypeOptions;
    return (
        <>
            <ValidationType
                options={options}
                index={index}
                disabled={options?.length === 1}
            />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (
    validationTypeOptions: ValidationTypeOptions = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent validationTypeOptions={validationTypeOptions} />
        )
    );
};
