import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Form } from "@lifesg/react-design-system/form";
import { V2_Text } from "@lifesg/react-design-system/v2_text";
import { DragHandleIcon, PlusCircleIcon } from "@lifesg/react-icons";
import { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DeleteButton } from "src/components/common/delete-button/";
import { TOverallOptionGroupBasedValues } from "src/yup-schemas";
import {
    DroppableWrapper,
    OptionsChildWrapper,
    OptionsDragHandleButton,
    Wrapper,
} from "./options-child.styles";
import { useBuilder, useIsElementDisabled } from "src/context-providers";

interface IProps {
    onDelete: () => void;
    id: string;
    index: number;
    fieldName: "radioItems" | "dropdownItems";
}

export const OptionsChild = ({ onDelete, id, index, fieldName }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<TOverallOptionGroupBasedValues>();

    const { focusedElement } = useBuilder();
    const isDisabled = useIsElementDisabled(
        focusedElement?.element?.id,
        focusedElement?.element?.type
    );

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver,
    } = useSortable({ id, disabled: isDisabled });

    const style: CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? "70%" : "100%",
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
    };

    const options = watch(fieldName);

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const isDeleteDisabled = () => {
        return isDisabled || options.length < 3;
    };
    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const droppableContent = isOver ? (
        <DroppableWrapper isOver={isOver}>
            <PlusCircleIcon />
        </DroppableWrapper>
    ) : null;

    const renderPopoverMessage = () => {
        return (<V2_Text.Body>Item deletion is not allowed when there are less than 3 items.</V2_Text.Body>);
    };

    return (
        <Wrapper>
            {droppableContent}
            <OptionsChildWrapper
                data-testid="option-child"
                ref={setNodeRef}
                style={style}
                {...attributes}
            >
                <OptionsDragHandleButton {...listeners}>
                    <DragHandleIcon />
                </OptionsDragHandleButton>
                <Controller
                    name={`${fieldName}.${index}.label`}
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            disabled={isDisabled}
                            data-testid="option-label"
                            placeholder="Enter label"
                            {...field}
                            errorMessage={
                                errors[fieldName]?.[index]?.label?.message
                            }
                        />
                    )}
                ></Controller>
                <Controller
                    name={`${fieldName}.${index}.value`}
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            disabled={isDisabled}
                            data-testid="option-value"
                            placeholder="Enter value"
                            {...field}
                            errorMessage={
                                errors[fieldName]?.[index]?.value?.message
                            }
                        />
                    )}
                ></Controller>
                <DeleteButton
                    onClick={onDelete}
                    popoverMessage={renderPopoverMessage()}
                    disabled={isDeleteDisabled()}
                />
            </OptionsChildWrapper>
        </Wrapper>
    );
};
