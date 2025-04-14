import { TElement } from "src/context-providers";
import {
    elementSizeToColumn,
    generateConditionalRenderingSchema,
} from "../helper";

export const generateBaseSchema = (element: TElement) => {
    const conditionalRenderingSchema = generateConditionalRenderingSchema(
        element?.conditionalRendering
    );

    return {
        label: {
            mainLabel: element.label,
            ...(element.description && { subLabel: element.description }),
        },
        uiType: element.type,
        columns: elementSizeToColumn(element.size),
        ...(element.required && {
            validation: [
                {
                    required: true,
                    ...(element.requiredErrorMsg && {
                        errorMessage: element.requiredErrorMsg,
                    }),
                },
            ],
        }),
        ...(conditionalRenderingSchema && {
            showIf: conditionalRenderingSchema,
        }),
    };
};
