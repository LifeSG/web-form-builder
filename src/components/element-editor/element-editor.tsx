import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useBuilder } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { BasicDetails } from "./basic-details";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();

    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(
            SchemaHelper.buildSchema(focusedElement.element.type)
        ),
    });

    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
    );
};
