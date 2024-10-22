import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { IdField } from "src/components/element-editor/basic-details/common";
import { EElementType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("IdField", () => {
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

    it("should display error message if field is touched and left empty", async () => {
        renderComponent();

        const idInput = await screen.findByPlaceholderText("Create an ID");
        fireEvent.focus(idInput);
        fireEvent.change(idInput, { target: { value: null } });
        fireEvent.blur(idInput);
        const errorMessage = await screen.findByText("ID required.");
        expect(errorMessage).toBeInTheDocument();
    });

    it("should be disabled if the focused element type is disabled", async () => {
        renderComponent({
            configContext: {
                elements: {
                    "Email address": {
                        isDisabled: true,
                    },
                },
            },
            builderContext: {
                focusedElement: {
                    element: {
                        type: EElementType.EMAIL,
                        required: false,
                        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
                        internalId: "mockId123",
                        id: "email-address",
                        label: "Email address",
                    },
                },
            },
        });

        const idField = await screen.findByTestId("id-field");
        expect(idField).toBeDisabled();
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <IdField />));
};
