import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { BasicDetails } from "./basic-details";
import { AccordionWrapper } from "./element-editor.styles";
import { Validation } from "./validation/validation";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const methods = useForm({
        mode: "onBlur",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    return (
        <FormProvider {...methods}>
            <AccordionWrapper>
                <BasicDetails />
            </AccordionWrapper>
            <Validation />
        </FormProvider>
    );
};
