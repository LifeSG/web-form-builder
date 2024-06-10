import { EElementType, TElement } from "src/context-providers";
import { ELEMENT_BUTTON_LABELS } from "src/data";
import { ElementObjectGenerator } from "src/util";

describe("ElementObjectGenerator", () => {
    describe("generate", () => {
        it("should be able to generate a new element with an id, type & label generated being required by default", () => {
            const newElement = ElementObjectGenerator.generate(
                MOCK_TYPE,
                MOCK_INTERNAL_IDS,
                []
            );

            expect(newElement.id).toMatch(/email-field/);
            expect(newElement.label).toMatch(/Email address/);
            expect(newElement.type).toMatch(EElementType.EMAIL);
            expect(newElement.required).toBe(true);
        });

        it("should generate a unique internalId not in existingIds", () => {
            const newElement = ElementObjectGenerator.generate(
                MOCK_TYPE,
                MOCK_INTERNAL_IDS,
                MOCK_GENERATE_IDS
            );

            expect(MOCK_INTERNAL_IDS).not.toContain(newElement.internalId);
        });

        describe("generating of ids for new elements", () => {
            it("should generate another new id, after generating a new element again", () => {
                const newElement = ElementObjectGenerator.generate(
                    MOCK_TYPE,
                    MOCK_INTERNAL_IDS,
                    MOCK_GENERATE_IDS
                );
                expect(newElement.id).toMatch(/email-field-1/);
            });

            it("should correctly generate a new ID for an element when email-field and email-field-1 already exist", () => {
                const newElement = ElementObjectGenerator.generate(
                    MOCK_TYPE,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_GENERATE_IDS, "email-field-1"]
                );
                expect(newElement.id).toMatch(/email-field-2/);
            });

            it('should verify that the function generates the correct ID when the next available ID should be "email-field-3"', () => {
                const newElement = ElementObjectGenerator.generate(
                    MOCK_TYPE,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_GENERATE_IDS, "email-field-2"]
                );
                expect(newElement.id).toMatch(/email-field-3/);
            });

            it('should generate the correct ID when the next available ID should be "email-field-4"', () => {
                const newElement = ElementObjectGenerator.generate(
                    MOCK_TYPE,
                    MOCK_INTERNAL_IDS,
                    [...MOCK_GENERATE_IDS, "email-field-3"]
                );
                expect(newElement.id).toMatch(/email-field-4/);
            });

            it("should replicate the same behaviour of id generation for other element types", () => {
                const newElement = ElementObjectGenerator.generate(
                    EElementType.TEXT,
                    MOCK_INTERNAL_IDS,
                    MOCK_GENERATE_IDS
                );
                expect(newElement.id).toMatch(/short-text-field/);
            });
        });
    });
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

const MOCK_TYPE: EElementType = EElementType.EMAIL;

const MOCK_INTERNAL_IDS = ["mock123", "mock345"];
const MOCK_IDS = ["mockElement", "mockShortText"];
const MOCK_GENERATE_IDS = ["email-field", "long-text-field"];
