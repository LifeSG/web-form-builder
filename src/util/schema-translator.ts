import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components";
import { EElementType, TElement, TElementMap } from "src/context-providers";

const emailFieldToSchema = (element: TElement) => {
    const emailFieldSchema = {
        [element.id]: {
            label: element.label,
            uiType: element.type,
            columns: {
                desktop: element.columns,
            },
            placeholder: element.placeholder,

            validation: [
                {
                    required: element.required,
                    errorMessage: element.requiredErrorMsg,
                },
            ],
        },
    };

    return emailFieldSchema;
};

const textBasedFieldToSchema = (element: TElement) => {
    const textBasedFieldSchema = {
        [element.id]: {
            label: element.label,
            uiType: element.type,
            columns: {
                desktop: element.columns,
            },
            placeholder: element.placeholder,

            validation: [
                {
                    required: element.required,
                    errorMessage: element.requiredErrorMsg,
                },
            ],
        },
    };

    return textBasedFieldSchema;
};

const generateSchemaByType = (element: TElement) => {
    switch (element.type) {
        case EElementType.EMAIL:
            return emailFieldToSchema(element);
        case EElementType.TEXT:
        case EElementType.TEXTAREA:
        case EElementType.CONTACT:
        case EElementType.NUMERIC:
            return textBasedFieldToSchema(element);
    }
};

export function generateSchema(elements: TElementMap) {
    let fields = {};

    Object.entries(elements).forEach(([_, value]) => {
        const translatedChild = generateSchemaByType(value);
        fields = { ...fields, ...translatedChild };
    });

    const elementSchema: IFrontendEngineData = {
        sections: {
            section: {
                children: {
                    grid: {
                        children: {
                            ...fields,
                        },
                        uiType: "grid",
                    },
                    "submit-button": {
                        label: "Submit",
                        uiType: "submit",
                    },
                },
                uiType: "section",
            },
        },
    };
    return elementSchema;
}

export function translateSchema(schema: string) {
    console.log("this is the schema:", schema);
}
