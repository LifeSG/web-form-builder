import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { DefaultCountryCode } from "src/components/element-editor/basic-details/elements/contact";
import { TestHelper } from "src/util/test-helper";

describe("DefaultCountryCode", () => {
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

    it("should render DisplayAsFixedCountryCode only if default country code is selected", () => {
        renderComponent();
        expect(screen.queryByText("Display as fixed country code")).toBeNull();

        const defaultCountryCode = screen.getByTestId("default-country-code");
        expect(defaultCountryCode).toBeInTheDocument();

        fireEvent.click(defaultCountryCode);
        const secondOption = screen.getAllByRole("option")[1];

        fireEvent.click(secondOption);

        expect(
            screen.getByText("Display as fixed country code")
        ).toBeInTheDocument();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <DefaultCountryCode />)
    );
};
