import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { getValidationOptionsByType } from "src/components/element-editor/validation";
import { ContactValidationChild } from "src/components/element-editor/validation/elements";
import { EElementType, EValidationType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("ContactValidationChild", () => {
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

    it("should render ContactValidationChild component with default type and error message", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    validation: [
                        {
                            validationType: EValidationType.CONTACT_NUMBER,
                            validationErrorMessage: "Invalid contact number.",
                        },
                    ],
                },
            },
        });
        const validationType = screen.getByTestId("validation-type");
        expect(validationType).toBeInTheDocument();
        expect(validationType).toHaveTextContent("Contact number format");
        const validationErrorMessage = screen.getByTestId(
            "validation-error-message-base"
        );
        expect(validationErrorMessage).toBeInTheDocument();
    });

    it("should render ContactValidationRule when defaultCountryCode is 'Singapore' and displayAsFixedCountryCode is true", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    defaultCountryCode: "Singapore",
                    displayAsFixedCountryCode: true,
                },
            },
        });
        expect(
            screen.getByTestId("contact-validation-rule")
        ).toBeInTheDocument();
    });

    it("should not render ContactValidationRule when defaultCountryCode is '65' and displayAsFixedCountryCode is false", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    defaultCountryCode: "Singapore",
                    displayAsFixedCountryCode: false,
                },
            },
        });
        expect(
            screen.queryByTestId("contact-validation-rule")
        ).not.toBeInTheDocument();
    });

    it("should not render ContactValidationRule when defaultCountryCode is not '65'", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    defaultCountryCode: "Albania",
                    displayAsFixedCountryCode: true,
                },
            },
        });
        expect(
            screen.queryByTestId("contact-validation-rule")
        ).not.toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ContactValidationChild
                index={0}
                options={getValidationOptionsByType([], EElementType.CONTACT)}
                disabled={true}
            />
        )
    );
};
