import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ValidationChild } from "src/components/element-editor/validation/common";
import { IValidation } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("ValidationChild", () => {
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

    it("should render fields with prefilled values when values are provided", () => {
        const mockValidationValue: IValidation[] = [
            {
                validationType: "Option 1",
                validationRule: "mockRule",
                validationErrorMessage: "mockErrorMessage",
            },
        ];
        renderComponent(
            {
                onDelete: mockDelete,
                options: mockOptions,
                index: mockIndex,
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
        expect(screen.getByDisplayValue("mockRule")).toBeInTheDocument();
        expect(
            screen.getByDisplayValue("mockErrorMessage")
        ).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            options: mockOptions,
            index: mockIndex,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });
});

interface ValidationChildOptions {
    onDelete?: () => void;
    options?: string[];
    index?: number;
}

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
                disabled={options?.length === 1}
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

const mockDelete = jest.fn();

const mockIndex = 0;
