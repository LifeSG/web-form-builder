import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";
import kebabCase from "lodash/kebabCase";
import { EmailBasicDetails } from "src/components";
import {
    EElementType,
    TCustomisableElementAttributes,
    TElement,
} from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { TestHelper } from "src/util/test-helper";

describe("EmailBasicDetails", () => {
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
            (fieldName) => {
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
                            element: MOCK_FOCUSED_EMAIL_ELEMENT,
                            isDirty: false,
                        },
                        selectedElementType: EElementType.EMAIL,
                    },
                });

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
        TestHelper.withProviders(overrideOptions, <EmailBasicDetails />)
    );
};

const MOCK_FOCUSED_EMAIL_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    columns: {
        desktop: 12,
        tablet: 8,
        mobile: 4,
    } as const,
};