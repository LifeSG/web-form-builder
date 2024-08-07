import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import { BasicDetails } from "src/components/element-editor/basic-details";
import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("BasicDetails", () => {
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

    describe("conditional rendering of element-specific basic details component", () => {
        it("should render the EMAIL basic details component when the element type is EMAIL", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.EMAIL),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.EMAIL,
                },
            });

            const emailBasicDetails = await screen.findByTestId(
                "email-basic-details"
            );
            expect(emailBasicDetails).toBeInTheDocument();
        });

        it("should render the TEXT basic details component when the element type is TEXT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.TEXT),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.TEXT,
                },
            });

            const textBasicDetails =
                await screen.findByTestId("text-basic-details");
            expect(textBasicDetails).toBeInTheDocument();
        });

        it("should render the LONG TEXT basic details component when the element type is LONG TEXT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.TEXTAREA),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.TEXTAREA,
                },
            });

            const longTextBasicDetails = await screen.findByTestId(
                "long-text-basic-details"
            );
            expect(longTextBasicDetails).toBeInTheDocument();
        });

        it("should render the NUMERIC basic details component when the element type is NUMERIC", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.NUMERIC),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.NUMERIC,
                },
            });

            const numericBasicDetails = await screen.findByTestId(
                "numeric-basic-details"
            );
            expect(numericBasicDetails).toBeInTheDocument();
        });

        it("should render the CONTACT basic details component when the element type is CONTACT", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.CONTACT),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.CONTACT,
                },
            });

            const contactBasicDetails = await screen.findByTestId(
                "contact-basic-details"
            );
            expect(contactBasicDetails).toBeInTheDocument();
        });

        it("should render the DROPDOWN basic details component when the element type is DROPDOWN", async () => {
            renderComponent({
                builderContext: {
                    focusedElement: {
                        element: MOCK_FOCUSED_ELEMENT(EElementType.DROPDOWN),
                        isDirty: false,
                    },
                    selectedElementType: EElementType.DROPDOWN,
                },
            });

            const dropdownBasicDetails = await screen.findByTestId(
                "dropdown-basic-details"
            );
            expect(dropdownBasicDetails).toBeInTheDocument();
        });
    });
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const renderComponent = (overrideOptions?: TestHelper.RenderOptions) => {
    return render(TestHelper.withProviders(overrideOptions, <BasicDetails />));
};

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_FOCUSED_ELEMENT = (elementType: EElementType) => {
    const element: TElement = {
        internalId: "mock123",
        type: elementType,
        id: "mockElement",
        required: false,
        description: "hellooo",
        label: ELEMENT_BUTTON_LABELS[elementType],
        columns: { desktop: 12, tablet: 8, mobile: 4 } as const,
    };
    return element;
};
