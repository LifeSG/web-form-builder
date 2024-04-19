import { screen, fireEvent, render } from "@testing-library/react";
import "jest-canvas-mock";
import { ChildEntry } from "src/components";
import { TestHelper } from "src/util/test-helper";

describe("ChildEntry", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should contain the child content that is being passed into the component", () => {
        renderComponent({
            onDelete: mockDelete,
            children: mockChild,
        });
        expect(screen.getByText("Children content")).toBeInTheDocument();
    });

    it("should run the delete function when clicking on the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            children: mockChild,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });
});

const renderComponent = (
    options: {
        onDelete?: () => void;
        children?: React.ReactNode;
    } = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    const { onDelete, children } = options;
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <ChildEntry onDelete={onDelete}>{children}</ChildEntry>
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockChild = <h1>Children content</h1>;
const mockDelete = jest.fn();
