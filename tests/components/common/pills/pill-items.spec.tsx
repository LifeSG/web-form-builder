import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { PillItems } from "src/components/common/pills/pill-items";
import { EElementType } from "src/context-providers";
import { TestHelper } from "src/util/test-helper";

describe("PillItems", () => {
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
        it("should render the popover when hovering over the disabled delete button when there are less than 3 pillItems", async () => {
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

    describe("submitting the form for pill items", () => {
        it("should not be able to submit the form if there are not at least 2 valid pill items", async () => {
            renderComponent({
                builderContext: {
                    selectedElementType: EElementType.TEXTAREA,
                },
                formContext: {
                    defaultValues: {
                        pillItems: [{ content: "" }, { content: "" }],
                    },
                },
            });

            const submitButton = screen.getByText("Submit");
            fireEvent.click(submitButton);

            const errorMessage = await screen.findAllByText(
                "Pill item content is required."
            );

            // Initially there are 2 empty items
            expect(errorMessage).toHaveLength(2);
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const MyTestComponent = () => {
    return (
        <>
            <PillItems />
            <button type="submit">Submit</button>
        </>
    );
};

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, MyTestComponent()));
};
