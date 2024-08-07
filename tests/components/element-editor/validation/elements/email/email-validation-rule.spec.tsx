import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { EmailValidationRule } from "src/components/element-editor/validation/elements/email";
import { EValidationType, IValidation } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("EmailValidationRule", () => {
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

    it("should render an error message when validation rule is invalid", async () => {
        const mockInvalidValidationValue: IValidation[] = [
            {
                validationType: EValidationType.EMAIL_DOMAIN,
                validationRule: "mockRule",
                validationErrorMessage: "mockErrorMessage",
            },
        ];

        renderComponent({
            formContext: {
                currentValues: {
                    validation: mockInvalidValidationValue,
                },
            },
        });
        const getValidationRuleField = screen.getByPlaceholderText(
            "Enter email domain, separating with a comma"
        );
        fireEvent.focus(getValidationRuleField);
        fireEvent.blur(getValidationRuleField);
        const validationRuleError = await screen.findByText(
            "Invalid email domain. Check if email domain is correct with no whitespace between characters. Separate each with a comma if there is more than 1 email."
        );
        expect(validationRuleError).toBeInTheDocument();
    });

    it("should render an error message specific to email type when validation rule is left empty", async () => {
        const mockEmptyValidationValue: IValidation[] = [
            {
                validationType: EValidationType.EMAIL_DOMAIN,
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
            "Email domain required."
        );

        expect(validationError).toBeInTheDocument();
    });
});

const MyTestComponent = () => {
    return (
        <>
            <EmailValidationRule index={0} />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <MyTestComponent />)
    );
};
