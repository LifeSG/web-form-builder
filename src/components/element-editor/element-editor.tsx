import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { IFieldValues } from "./types";
import { BasicDetails } from "./basic-details/basic-details";
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
