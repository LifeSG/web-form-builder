import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { ContactValidationChild } from "src/components/element-editor/validation/elements";
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

    it("should render ContactValidationRule when defaultCountryCode is '65' and displayAsFixedCountryCode is true", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    defaultCountryCode: "65",
                    displayAsFixedCountryCode: true,
                },
            },
        });
        expect(
            screen.queryByTestId("contact-validation-rule")
        ).toBeInTheDocument();
    });

    it("should not render ContactValidationRule when defaultCountryCode is '65' and displayAsFixedCountryCode is false", () => {
        renderComponent({
            formContext: {
                defaultValues: {
                    defaultCountryCode: "65",
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
                    defaultCountryCode: "66",
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
            <ContactValidationChild index={0} options={[]} />
        )
    );
};
