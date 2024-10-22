import { fireEvent, render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import kebabCase from "lodash/kebabCase";
import { DropdownBasicDetails } from "src/components";
import {
    EElementType,
    TCustomisableElementAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("DropdownBasicDetails", () => {
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
    it("should render the preselected value if the element type is dropdown and there is at least 1 valid dropdown item", async () => {
        renderComponent({
            builderContext: {
                focusedElement: {
                    element: MOCK_FOCUSED_DROPDOWN_ELEMENT,
                },
                selectedElementType: EElementType.DROPDOWN,
            },
            formContext: {
                elementType: EElementType.DROPDOWN,
            },
        });

        const dropdownItem = screen.getByText("Dropdown items");
        expect(dropdownItem).toBeInTheDocument();

        const dropdownItemLabels = await screen.findAllByTestId("option-label");
        const dropdownItemValues = await screen.findAllByTestId("option-value");

        expect(dropdownItemLabels[0]).toBeInTheDocument();
        expect(dropdownItemValues[0]).toBeInTheDocument();

        expect(
            screen.queryByText("Pre-selected value (optional)")
        ).not.toBeInTheDocument();

        fireEvent.change(dropdownItemLabels[0], {
            target: { value: "New Label" },
        });
        fireEvent.change(dropdownItemValues[0], {
            target: { value: "New Value" },
        });

        expect(dropdownItemLabels[0]).toHaveValue("New Label");
        expect(dropdownItemValues[0]).toHaveValue("New Value");

        const preselectedValue = await screen.findByText(
            "Pre-selected value (optional)"
        );

        expect(preselectedValue).toBeInTheDocument();
    });

    describe("hiding of form fields based on Form Builder Config", () => {
        const attributeFields: Array<keyof TCustomisableElementAttributes> = [
            "type",
            "description",
            "id",
            "label",
            "placeholder",
            "preselectedValue",
        ];

        it.each(attributeFields)(
            "should hide the %s field when shouldShow in attributes is set to false",
            async (fieldName) => {
                renderComponent({
                    configContext: {
                        attributes: {
                            [fieldName]: {
                                shouldShow: false,
                            },
                        },
                    },
                    builderContext: {
                        focusedElement: {
                            element: MOCK_FOCUSED_DROPDOWN_ELEMENT,
                            isDirty: false,
                        },
                        selectedElementType: EElementType.DROPDOWN,
                    },
                });

                if (fieldName === "preselectedValue") {
                    //Ensure the rendering condition is met
                    const dropdownItemLabels =
                        await screen.findAllByTestId("option-label");
                    const dropdownItemValues =
                        await screen.findAllByTestId("option-value");

                    fireEvent.change(dropdownItemLabels[0], {
                        target: { value: "New Label" },
                    });
                    fireEvent.change(dropdownItemValues[0], {
                        target: { value: "New Value" },
                    });
                }

                const field = screen.queryByTestId(
                    `${kebabCase(fieldName)}-field`
                );
                expect(field).not.toBeInTheDocument();
            }
        );
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(
        TestHelper.withProviders(overrideOptions, <DropdownBasicDetails />)
    );
};

const MOCK_FOCUSED_DROPDOWN_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.DROPDOWN,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.DROPDOWN],
    columns: {
        desktop: 12,
        tablet: 8,
        mobile: 4,
    } as const,
    dropdownItems: [
        { label: "", value: "" },
        { label: "", value: "" },
    ],
};
