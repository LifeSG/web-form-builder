import { TElement } from "src/context-providers";
import { generateConditionalRenderingSchema } from "../helper";

export const generateBaseSchema = (element: TElement) => {
    const conditionalRenderingSchema = generateConditionalRenderingSchema(
        element?.conditionalRendering
    );

    return {
        label: {
            mainLabel: element.label,
            ...(element.description && {
                subLabel: element.description,
            }),
        },
        uiType: element.type,
        columns: {
            desktop: element.size === "full" ? element.columns.desktop : 6,
            tablet: element.columns.tablet,
            mobile: element.columns.mobile,
        },
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
