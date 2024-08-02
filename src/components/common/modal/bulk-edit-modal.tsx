import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import isEmpty from "lodash/isEmpty";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { IBulkEditModalProps } from "src/context-providers";
import { BULK_EDIT_SCHEMA, TBulkEditData } from "src/schemas/bulk-edit";
import { useModal } from "../../../context-providers/display/modal-hook";
import { Wrapper } from "./bulk-edit-modal.styles";
import { GenericModal } from "./generic-modal";
import { ActionButton, ButtonWrapper } from "./modals.styles";

interface IProps {
    modal: IBulkEditModalProps;
}

export const BulkEditModal = ({ modal }: IProps) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const { hideModal } = useModal();
    const { type, onClickActionButton, dropdownItemsString } = modal;
    const methods = useForm({
        mode: "onTouched",
        resolver: yupResolver(BULK_EDIT_SCHEMA),
        defaultValues: {
            items: dropdownItemsString,
        },
    });

    const dropdownItemsErrors = methods.formState.errors;

    // =========================================================================
    // EFFECTS
    // =========================================================================

    useEffect(() => {
        methods.trigger("items");
    }, []);

    // ============================================================================
    // HELPER FUNCTIONS
    // ============================================================================

    const handleClickCancel = () => {
        hideModal(type);
    };

    const handleFormSubmit = (data: TBulkEditData) => {
        onClickActionButton(data.items);
        hideModal(type);
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderActionButtons = () => {
        return (
            <ButtonWrapper>
                <ActionButton
                    type="button"
                    onClick={handleClickCancel}
                    styleType="light"
                >
                    Cancel
                </ActionButton>
                <ActionButton disabled={!isEmpty(dropdownItemsErrors)}>
                    Save
                </ActionButton>
            </ButtonWrapper>
        );
    };

    return (
        <GenericModal type={modal?.type}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <Wrapper data-testid="bulk-edit-modal">
                        <Text.H3 weight={600}>Bulk Edit</Text.H3>
                        <Text.Body weight={400}>
                            To add multiple entries at once, input each item on
                            a new line, separating the label and value with a
                            bar “|”.
                        </Text.Body>
                        <Text.H6 weight={400}>
                            Example:
                            <br />
                            Banana | banana
                            <br />
                            Green Apple | green-apple
                        </Text.H6>
                        <Controller
                            name="items"
                            control={methods.control}
                            render={({ field }) => (
                                <Form.Textarea
                                    {...field}
                                    placeholder="Enter label and value"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    errorMessage={
                                        methods.formState.errors.items?.message
                                    }
                                />
                            )}
                        />
                    </Wrapper>
                    {renderActionButtons()}
                </form>
            </FormProvider>
        </GenericModal>
    );
};
