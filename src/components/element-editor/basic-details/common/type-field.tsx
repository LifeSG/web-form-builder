import { useState } from "react";
import {
    Controller,
    ControllerRenderProps,
    useFormContext,
} from "react-hook-form";
import { IconDropdown } from "src/components/common/icon-dropdown";
import {
    EElementType,
    EModalType,
    IResetFieldsModalProps,
    useBuilder,
} from "src/context-providers";
import { useModal } from "src/context-providers/display/modal-hook";
import { TFormFieldValues } from "src/yup-schemas";

export const TypeField = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================

    const { selectElementType, selectedElementType } = useBuilder();
    const { showModal, hideModal } = useModal();
    const {
        control,
        formState: { errors },
    } = useFormContext<TFormFieldValues>();

    const [localType, setLocalType] =
        useState<EElementType>(selectedElementType);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const handleChange = (
        value: EElementType,
        field: ControllerRenderProps<TFormFieldValues, "type">
    ) => {
        if (value === field.value) {
            return;
        }
        setLocalType(value);
        const resetFieldsModal: IResetFieldsModalProps = {
            type: EModalType.ResetFields,
            onClickActionButton: () => {
                hideModal(EModalType.ResetFields);
                selectElementType(value);
                field.onChange(value);
            },
            onClose: () => {
                hideModal(EModalType.ResetFields);
                setLocalType(selectedElementType);
            },
        };

        showModal(resetFieldsModal);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return (
        <Controller
            name="type"
            control={control}
            render={({ field }) => (
                <IconDropdown
                    onBlur={field.onBlur}
                    type={localType}
                    onChange={(value: EElementType) => {
                        handleChange(value, field);
                    }}
                    errorMessage={errors.type?.message}
                />
            )}
        />
    );
};
