import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { BasicDetails } from "./basic-details";
import { buildSchema } from "./schema";

export const ElementEditor = () => {
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(buildSchema()),
    });

    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
    );
};
