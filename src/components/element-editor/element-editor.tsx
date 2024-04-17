import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@lifesg/react-design-system/alert";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EElementType, useBuilder } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
import { BasicDetails } from "./basic-details";
import { AccordionWrapper } from "./element-editor.styles";

interface IProps {
    setSaveChangesHandler: (value: () => void) => void;
}
export const ElementEditor = ({ setSaveChangesHandler }: IProps) => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { updateElement, updateFocusedElement, focusedElement } =
        useBuilder();

    const methods = useForm({
        mode: "onBlur",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    const onSubmit = useCallback(
        (values) => {
            updateElement(values);
            updateFocusedElement(false, values);
            methods.reset(
                {
                    ...methods.getValues(),
                },
                {
                    keepDirty: false,
                }
            );
        },
        [updateElement, updateFocusedElement]
    );
    // =========================================================================
    // USE EFFECTS
    // =========================================================================

    useEffect(() => {
        if (setSaveChangesHandler) {
            setSaveChangesHandler(() => methods.handleSubmit(onSubmit));
        }
    }, [methods, onSubmit, setSaveChangesHandler]);

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderAlert = () => {
        if (focusedElement.isDirty === false) {
            return <></>;
        }
        return (
            <Alert type="warning" showIcon>
                To reflect changes on preview, save changes first.
            </Alert>
        );
    };

    return (
        <FormProvider {...methods}>
            {renderAlert()}
            <form onSubmit={() => methods.handleSubmit(onSubmit)}>
                <AccordionWrapper>
                    <BasicDetails />
                </AccordionWrapper>
            </form>
        </FormProvider>
    );
};
