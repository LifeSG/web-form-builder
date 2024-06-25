import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components";
import {
    EConditionType,
    EElementType,
    IConditionalRendering,
    IValidation,
    TElement,
    TElementMap,
} from "src/context-providers";
import { SCHEMA_CONDITION_TYPES } from "src/data";
interface ISchemaValidation {
    [key: string]: string | boolean;
    errorMessage: string;
}

const createConditionalRenderingObject = (
    conditions: IConditionalRendering[]
) => {
    if (conditions) {
        const conditionObj = conditions.map((condition) => {
            const value =
                condition.comparator === EConditionType.LESS_THAN ||
                condition.comparator === EConditionType.MORE_THAN
                    ? parseInt(condition.value)
                    : condition.value;
            return {
                [condition.fieldKey]: [
                    {
                        filled: true,
                    },
                    {
                        [SCHEMA_CONDITION_TYPES[condition.comparator]]: value,
                    },
                ],
            };
        });
        return conditionObj;
    }
};

const emailFieldToSchema = (element: TElement) => {
    const mapDomainToRegex = (domains: IValidation) => {
        if (domains) {
            const domainsArr = domains?.validationRule.split(",");
            const translatedDomains = domainsArr?.map((domain) =>
                domain.trim().replace(/^@/, "").replace(/\./g, "\\.")
            );
            const regexPattern = `^[a-zA-Z0-9._%+-]+@(${translatedDomains.join("|")})$`;
            return new RegExp(regexPattern);
        }
    };

    function createValidationObject(
        element: TElement,
        domainRegexString?: RegExp
    ) {
        const validation: ISchemaValidation[] = [
            {
                required: element.required,
                errorMessage: element.requiredErrorMsg,
            },
        ];
        if (domainRegexString) {
            validation.push({
                matches: domainRegexString.toString(),
                errorMessage: element.validation?.[0]?.validationErrorMessage,
            });
        }

        return validation;
    }
    const conditionalRenderingObject = createConditionalRenderingObject(
        element?.conditionalRendering
    );
    const domainRegexString = mapDomainToRegex(element?.validation[0]);
    const validationObject = createValidationObject(element, domainRegexString);
    const emailFieldSchema = {
        [element.id]: {
            label: element.label,
            uiType: element.type,
            columns: {
                desktop: element.columns,
            },
            placeholder: element.placeholder,
            validation: validationObject,
            showIf: conditionalRenderingObject,
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
