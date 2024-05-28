import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { ElementObjectGenerator } from "src/util";

describe("ElementObjectGenerator", () => {
    describe("duplicate", () => {
        it("should be able to generate a duplicated element with a new id and the same details as the element that it being passed in", () => {
            const duplicatedElement = ElementObjectGenerator.duplicate(
                MOCK_ELEMENT,
                MOCK_INTERNAL_IDS,
                MOCK_IDS
            );

            expect(duplicatedElement.id).toMatch(/mockElement-copy/);
            expect(duplicatedElement.label).toMatch(MOCK_ELEMENT.label);
            expect(duplicatedElement.type).toMatch(MOCK_ELEMENT.type);
            expect(duplicatedElement.placeholder).toMatch(
                MOCK_ELEMENT.placeholder
            );
            expect(duplicatedElement.required).toBe(MOCK_ELEMENT.required);
            expect(duplicatedElement.requiredErrorMsg).toMatch(
                MOCK_ELEMENT.requiredErrorMsg
            );
        });

        it("should generate a unique internalId not in existingIds", () => {
            const duplicatedElement = ElementObjectGenerator.duplicate(
                MOCK_ELEMENT,
                MOCK_INTERNAL_IDS,
                MOCK_IDS
            );

            expect(MOCK_INTERNAL_IDS).not.toContain(
                duplicatedElement.internalId
            );
        });
        describe("generating of ids for duplicated elements", () => {
            it("should generate another new id, after duplicating the element again", () => {
                const duplicatedElement = ElementObjectGenerator.duplicate(
                    { ...MOCK_ELEMENT, id: "mockElement-copy" },
                    MOCK_INTERNAL_IDS,
                    [...MOCK_IDS, "mockElement-copy"]
                );
                expect(duplicatedElement.id).toMatch(/mockElement-copy-2/);
            });

            it("should correctly generate a new ID for an element when mockElement and mockElement-copy already exist", () => {
                const duplicatedElement = ElementObjectGenerator.duplicate(
                    MOCK_ELEMENT,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_IDS, "mockElement-copy"]
                );
                expect(duplicatedElement.id).toMatch(/mockElement-copy-2/);
            });

            it('should verify that the function generates the correct ID when the next available ID should be "mockElement-copy-3"', () => {
                const duplicatedElement = ElementObjectGenerator.duplicate(
                    MOCK_ELEMENT,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_IDS, "mockElement-copy-2"]
                );
                expect(duplicatedElement.id).toMatch(/mockElement-copy-3/);
            });

            it('should generate the correct ID when the next available ID should be "mockElement-copy-4"', () => {
                const duplicatedElement = ElementObjectGenerator.duplicate(
                    MOCK_ELEMENT,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_IDS, "mockElement-copy-3"]
                );
                expect(duplicatedElement.id).toMatch(/mockElement-copy-4/);
            });
        });
    });
});

// =============================================================================
// MOCKS
// =============================================================================

const MOCK_ELEMENT: TElement = {
    internalId: "mock123",
    type: EElementType.EMAIL,
    id: "mockElement",
    required: false,
    label: ELEMENT_BUTTON_LABELS[EElementType.EMAIL],
    placeholder: "mockElement",
    requiredErrorMsg: "This is an error message",
};

const MOCK_INTERNAL_IDS = ["mock123", "mock345"];
const MOCK_IDS = ["mockElement", "mockShortText"];
