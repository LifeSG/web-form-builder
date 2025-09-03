import { screen, fireEvent, render } from "@testing-library/react";
import "jest-canvas-mock";
import { ChildEntry } from "src/components";
import { TestHelper } from "src/util/test-helper";

describe("ChildEntry", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the child content that is being passed into the component", () => {
        renderComponent({
            children: <h1>Children content</h1>,
        });
        expect(screen.getByText("Children content")).toBeInTheDocument();
    });

    it("should call onDelete prop on clicking the bin icon", () => {
        const mockDelete = jest.fn();
        renderComponent({
            onDelete: mockDelete,
            children: <h1>Children content</h1>,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toHaveBeenCalled();
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
