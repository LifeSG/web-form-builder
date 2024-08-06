import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { getValidationOptionsByType } from "src/components/element-editor/validation/helper";
import { NumericValidationChild } from "src/components/element-editor/validation/numeric/numeric-validation-child";
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

    it("should not render the validation rule field if validation type is whole numbers", async () => {
        const mockValue: IValidation[] = [
            {
                validationType: EValidationType.WHOLE_NUMBERS,
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
