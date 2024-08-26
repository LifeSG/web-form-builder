import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { getValidationOptionsByType } from "src/components/element-editor/validation";
import { NumericValidationChild } from "src/components/element-editor/validation/elements/numeric";
import {
    EElementType,
    EValidationType,
    IValidation,
} from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("NumericValidationChild", () => {
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

    it("should un-render the validation rule field if validation type selected is whole numbers", async () => {
        const mockValue: IValidation[] = [
            {
                validationRule: "",
                validationErrorMessage: "",
            },
        ];
        renderComponent({
            formContext: {
                defaultValues: {
                    validation: mockValue,
                },
            },
        });

        expect(screen.queryByPlaceholderText("Enter rule")).toBeInTheDocument();

        const validationType = screen.getByRole("button", {
            name: "Select",
        });

        expect(validationType).toBeInTheDocument();

        fireEvent.click(validationType);

        const wholeNumbersOption = screen.getByText(
            EValidationType.WHOLE_NUMBERS
        );

        expect(wholeNumbersOption).toBeInTheDocument();
        fireEvent.click(wholeNumbersOption);

        expect(
            screen.queryByPlaceholderText("Enter rule")
        ).not.toBeInTheDocument();
    });
});

const MyTestComponent = () => {
    const onDelete = jest.fn();
    const options = getValidationOptionsByType([], EElementType.NUMERIC);
    return (
        <NumericValidationChild
            onDelete={onDelete}
            options={options}
            index={0}
        />
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};
