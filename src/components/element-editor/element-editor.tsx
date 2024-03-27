import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { BasicDetails } from "./basic-details";
import { buildSchema } from "../../schemas/helper";
import { EElementType } from "src/schemas";

export const ElementEditor = () => {
    const methods = useForm({
        mode: "onTouched",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(buildSchema(EElementType.EMAIL)),
    });

    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
    );
};
