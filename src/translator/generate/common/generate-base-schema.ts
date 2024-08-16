import { TElement } from "src/context-providers";
import { generateConditionalRenderingSchema } from "..";

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
            desktop: element.columns.desktop,
            tablet: element.columns.tablet,
            mobile: element.columns.mobile,
        },
        ...(element.placeholder && {
            placeholder: element.placeholder,
        }),
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
