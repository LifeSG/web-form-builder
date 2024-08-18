import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { IComplexLabel } from "@lifesg/web-frontend-engine/components/fields";
import { EElementType, TElement } from "src/context-providers";
import { IPrefillConfig } from "src/translator";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import { parseConditionalRenderingSchema, parsePrefillSchema } from "../helper";
import { TElementSchema } from "../types";

export const parseBaseSchema = (
    schema: TElementSchema,
    id: string,
    prefill: IPrefillConfig,
    defaultValue: string | undefined
) => {
    const { showIf, uiType, validation, label } = schema;

    let requiredValidation: IYupValidationRule = {};
    requiredValidation = validation?.find((rule) =>
        Object.prototype.hasOwnProperty.call(rule, "required")
    ) as IYupValidationRule;

    const internalId = SimpleIdGenerator.generate();

    const baseElement: TElement = {
        columns: { desktop: 12, tablet: 8, mobile: 4 },
        label: (label as IComplexLabel).mainLabel || "",
        description: (label as IComplexLabel).subLabel || "",
        type: uiType as EElementType,
        required: !!requiredValidation?.required,
        requiredErrorMsg: requiredValidation?.errorMessage || "",
        id,
        internalId,
        conditionalRendering: showIf
            ? parseConditionalRenderingSchema(showIf)
            : [],
        prefill: parsePrefillSchema(prefill, id) || [],
        preselectedValue: defaultValue || "",
    };

    return baseElement;
};
