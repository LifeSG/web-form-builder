import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { BasicDetails } from "./basic-details";

export const ElementEditor = () => {
    const methods = useForm({
        mode: "onTouched",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
    );
};
