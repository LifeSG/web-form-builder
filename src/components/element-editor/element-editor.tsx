import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "@lifesg/react-design-system";
import { useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useBuilder } from "src/context-providers";
import * as yup from "yup";
import { IFieldValues } from "./types";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { elements, focusedElement } = useBuilder();

    const camelCaseRegex = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/gm;
    const schema = useMemo(() => {
        return yup.object<IFieldValues>().shape({
            id: yup
                .string()
                .required("ID is required")
                .matches(camelCaseRegex, { message: "ID must be camelcase" })
                .notOneOf(
                    Array.from(elements.values())
                        .map((e) => e.id)
                        .filter((id) => id !== focusedElement.element.id),
                    "ID must not be duplicated"
                ),
            label: yup.string().required(),
            type: yup.string().required(),
            placeholder: yup.string().optional(),
        });
    }, []);

    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <FormProvider {...methods}>
            <BasicDetails />
        </FormProvider>
    );
};

export const BasicDetails = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { focusedElement } = useBuilder();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormContext<IFieldValues>();
    const element = focusedElement.element;

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleClick = (values: any) => {
        console.log(errors);
        console.log(values);
    };

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const hasLabel = () => {
        return "label" in element;
    };

    const hasPlaceholder = () => {
        return "placeholder" in element;
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <div>
            <Form.Input
                {...register("id")}
                required
                label="ID"
                placeholder="Enter ID"
                errorMessage={errors.id?.message}
            />
            {hasLabel() && (
                <Form.Input
                    required
                    label="Label"
                    placeholder="Enter label"
                    errorMessage={errors.label?.message}
                    {...register("label")}
                />
            )}
            {hasPlaceholder() && (
                <Form.Input
                    label="Placeholder"
                    placeholder="Enter placeholder"
                    errorMessage={errors.placeholder?.message}
                    {...register("placeholder")}
                />
            )}
            <Button.Small onClick={handleSubmit(handleClick)}>
                Save
            </Button.Small>
        </div>
    );
};
