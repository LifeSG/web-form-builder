import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components";
import { EElementType, TElementMap } from "src/context-providers";

// TODO: Add functionality to check the element's type
export function generateSchema(elements: TElementMap) {
    let fields = {};

    Object.entries(elements).forEach(([_, value]) => {
        const translatedChild = {
            [value.id]: {
                label: value.label,
                uiType: value.type,
                columns: {
                    desktop: value.columns,
                },
                placeholder: value.placeholder,

                validation: [
                    {
                        required: value.required,
                        errorMessage: value.requiredErrorMsg,
                    },
                ],
            },
        };
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
