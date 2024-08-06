import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ValidationErrorMessage } from "src/components/element-editor/validation/common";
import { IValidation } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("ValidationErrorMessage", () => {
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

    it("should render an error message when validation error message is left empty", async () => {
        const mockEmptyValidationValue: IValidation[] = [
            {
                validationType: "",
                validationRule: "",
                validationErrorMessage: "",
            },
        ];
        renderComponent({
            formContext: {
                currentValues: {
                    validation: mockEmptyValidationValue,
                },
            },
        });
        const submitButton = screen.getByText("Submit");

        fireEvent.click(submitButton);

        const validationError = await screen.findByText(
            "Error message required."
        );

        expect(validationError).toBeInTheDocument();
    });
});

const MyTestComponent = () => {
    return (
        <>
            <ValidationErrorMessage index={0} />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};
