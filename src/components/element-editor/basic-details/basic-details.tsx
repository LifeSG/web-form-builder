import { Button } from "@lifesg/react-design-system/button";
import { Form } from "@lifesg/react-design-system/form";
import { useFormContext } from "react-hook-form";
import { useBuilder } from "src/context-providers";
import { IFieldValues } from "../types";

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
    const handleClick = (values: any) => {};

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const hasLabel = () => {
        return "label" in element;
    };

    const hasPlaceholder = () => {
        return "placeholder" in element;
    };

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
