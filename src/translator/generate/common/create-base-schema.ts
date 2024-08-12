import { TElement } from "src/context-providers";
import { createConditionalRenderingSchema } from "..";

export const createBaseSchema = (element: TElement) => {
    const conditionalRenderingSchema = createConditionalRenderingSchema(
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