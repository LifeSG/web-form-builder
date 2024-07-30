import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { Pills } from "src/components/common/pills";
import { TestHelper } from "src/util/test-helper";

describe("Pills", () => {
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

    describe("rendering the pill items", () => {
        it("should render the popover when hovering over the disabled delete button when there are less than 2 pillItems", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        pillItems: [{ content: "" }, { content: "" }],
                    },
                },
            });
            const deleteButton = screen.getAllByTestId("delete-button")[0];
            fireEvent.mouseOver(deleteButton);
            const popoverText = screen.queryByText(
                "Item deletion is not allowed when there are less than 3 items."
            );
            expect(popoverText).toBeInTheDocument();
        });

        it("should not render the popover when hovering over the disabled delete button when there are more than 2 pillItems", async () => {
            renderComponent({
                formContext: {
                    defaultValues: {
                        pillItems: [
                            { content: "" },
                            { content: "" },
                            { content: "" },
                        ],
                    },
                },
            });
            const deleteButton = screen.getAllByTestId("delete-button")[0];
            fireEvent.mouseOver(deleteButton);
            const popoverText = screen.queryByText(
                "Item deletion is not allowed when there are less than 3 items."
            );
            expect(popoverText).not.toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <Pills />));
};
