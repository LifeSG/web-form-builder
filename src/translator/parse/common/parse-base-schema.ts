import { IYupValidationRule } from "@lifesg/web-frontend-engine";
import { EElementType, TElement } from "src/context-providers";
import { elementSizeToColumn, IPrefillConfig } from "src/translator";
import { SimpleIdGenerator } from "src/util/simple-id-generator";
import {
    parseConditionalRenderingSchema,
    parsePrefillSchema,
    schemaColumnsToElementSize,
} from "../helper";
import { TElementSchema } from "../types";

export const parseBaseSchema = (
    schema: TElementSchema,
    id: string,
    prefill: IPrefillConfig,
    defaultValue?: string
) => {
    const { showIf, uiType, validation, label } = schema;

    let mainLabel = "";
    let subLabel = "";

    if (typeof label === "string") {
        mainLabel = label;
    } else if (label && "mainLabel" in label) {
        mainLabel = label.mainLabel;
        subLabel = label.subLabel || "";
    }

    const requiredValidation: IYupValidationRule = validation?.find((rule) =>
        Object.prototype.hasOwnProperty.call(rule, "required")
    ) as IYupValidationRule;

    const size = schemaColumnsToElementSize(schema.columns);
    const columns = elementSizeToColumn(size);
    const internalId = SimpleIdGenerator.generate();

    const baseElement: TElement = {
        columns,
        size,
        label: mainLabel,
        description: subLabel,
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
