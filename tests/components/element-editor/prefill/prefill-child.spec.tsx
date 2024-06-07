import { yupResolver } from "@hookform/resolvers/yup";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { FormProvider, useForm } from "react-hook-form";
import { PrefillChild } from "src/components/element-editor/prefill";
import { EElementType, IPrefillAttributes } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { TestHelper } from "src/util/test-helper";

describe("PrefillChild", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it("should render the component with provided options and fields", () => {
        renderComponent({
            onDelete: mockDelete,
            value: mockEmptyValue,
            index: mockIndex,
        });
        expect(screen.getByText("Select")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter a path")).toBeInTheDocument();
    });

    it("should render fields with prefilled values given the prefill mode is 'Previous source'", async () => {
        renderComponent({
            onDelete: mockDelete,
            value: mockValue,
            index: mockIndex,
        });

        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);

        await waitFor(() => {
            const getPrefillModeField = screen.getByRole("button", {
                name: "Previous source",
            });
            expect(getPrefillModeField).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockId")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPath")).toBeInTheDocument();
        });
    });

    it("should render fields with prefilled values given the prefill mode is 'Myinfo'", () => {
        const myInfoValue: IPrefillAttributes[] = [
            {
                prefillMode: "Myinfo",
                path: "mockPath",
            },
        ];
        renderComponent({
            onDelete: mockDelete,
            value: myInfoValue,
            index: mockIndex,
        });
        const getPrefillModeField = screen.getByRole("button", {
            name: "Myinfo",
        });
        expect(getPrefillModeField).toBeInTheDocument();
        expect(
            screen.queryByPlaceholderText("Enter an action ID.")
        ).not.toBeInTheDocument();
        expect(screen.getByDisplayValue("mockPath")).toBeInTheDocument();
    });

    it("should fire the delete function on clicking the bin icon", () => {
        renderComponent({
            onDelete: mockDelete,
            value: mockEmptyValue,
            index: mockIndex,
        });
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
        expect(mockDelete).toBeCalled();
    });

    it("should render an error message when prefill fields are left empty", async () => {
        renderComponent({
            onDelete: mockDelete,
            value: mockEmptyValue,
            index: mockIndex,
        });
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);
        const sourceRequiredError = await screen.findByText("Source required.");
        const pathRequiredError = await screen.findByText("Path required.");
        expect(sourceRequiredError).toHaveTextContent("Source required.");
        expect(pathRequiredError).toHaveTextContent("Path required.");
    });

    it("should render an error message when actionId field is left empty", async () => {
        renderComponent({
            onDelete: mockDelete,
            value: [{ ...mockValue[0], actionId: "" }],
            index: mockIndex,
        });
        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);
        const actionIDRequiredError = await screen.findByText(
            "Action ID required."
        );
        expect(actionIDRequiredError).toHaveTextContent("Action ID required.");
    });

    it("should render an error message when actionId field input is invalid", async () => {
        renderComponent({
            onDelete: mockDelete,
            value: [{ ...mockValue[0], actionId: "invalid.input" }],
            index: mockIndex,
        });

        const submitButton = screen.getByText("Submit");
        fireEvent.click(submitButton);

        await waitFor(() => {
            const actionIDInvalidError = screen.getByText("Invalid action ID.");
            expect(actionIDInvalidError).toHaveTextContent(
                "Invalid action ID."
            );
        });
    });

    it("should render an error message when path field input is invalid", async () => {
        renderComponent({
            onDelete: mockDelete,
            value: [{ ...mockEmptyValue[0], path: "invalid!input" }],
            index: mockIndex,
        });

        const getPathField = screen.getByPlaceholderText("Enter a path");
        fireEvent.focus(getPathField);
        fireEvent.blur(getPathField);
        const pathInvalidError = await screen.findByText("Invalid path.");
        expect(pathInvalidError).toHaveTextContent("Invalid path.");
    });
});

type PrefillChildOptions = {
    onDelete?: () => void;
    value?: IPrefillAttributes[];
    index?: number;
};

const MyTestComponent = ({
    prefillChildOptions = {},
}: { prefillChildOptions?: PrefillChildOptions } = {}) => {
    const { onDelete, value, index } = prefillChildOptions;
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });
    const onSubmit = jest.fn();
    methods.setValue("prefill", value);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <PrefillChild onDelete={onDelete} index={index} />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

const renderComponent = (
    prefillChildOptions: PrefillChildOptions = {},
    overrideOptions?: TestHelper.RenderOptions
) => {
    return render(
        TestHelper.withProviders(
            overrideOptions,
            <MyTestComponent prefillChildOptions={prefillChildOptions} />
        )
    );
};

// =============================================================================
// MOCKS
// =============================================================================
const mockDelete = jest.fn();
const mockOnChange = jest.fn();
const mockValue: IPrefillAttributes[] = [
    {
        prefillMode: "Previous source",
        actionId: "mockId",
        path: "mockPath",
    },
];

const mockEmptyValue: IPrefillAttributes[] = [
    {
        prefillMode: null,
        path: "",
    },
];
const mockIndex = 0;
