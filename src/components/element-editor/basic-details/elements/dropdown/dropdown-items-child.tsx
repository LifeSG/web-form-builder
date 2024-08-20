import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { DragHandleIcon, PlusCircleIcon } from "@lifesg/react-icons";
import { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DeleteButton } from "src/components/common/delete-button/";
import { TOverallOptionGroupBasedSchema } from "src/yup-schemas";
import {
    DropdownItemsChildWrapper,
    DropdownItemsDragHandleButton,
    DroppableWrapper,
    Wrapper,
} from "./dropdown-items-child.styles";

interface IProps {
    onDelete: () => void;
    id: string;
    index: number;
}

export const DropdownItemsChild = ({ onDelete, id, index }: IProps) => {
    // =============================================================================
    // CONST, STATE, REFS
    // =============================================================================

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext<TOverallOptionGroupBasedSchema>();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver,
    } = useSortable({ id });

    const style: CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? "70%" : "100%",
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
    };

    const dropdownItems = watch("dropdownItems");

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const isDeleteDisabled = () => {
        return dropdownItems.length < 3;
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
        return (
            <Text.Body>
                Item deletion is not allowed when there are less than 3 items.
            </Text.Body>
        );
    };

    return (
        <Wrapper>
            {droppableContent}
            <DropdownItemsChildWrapper
                data-testid="dropdown-item-child"
                ref={setNodeRef}
                style={style}
                {...attributes}
            >
                <DropdownItemsDragHandleButton {...listeners}>
                    <DragHandleIcon />
                </DropdownItemsDragHandleButton>
                <Controller
                    name={`dropdownItems.${index}.label`}
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            data-testid="dropdown-item-label"
                            placeholder="Enter label"
                            {...field}
                            errorMessage={
                                errors.dropdownItems?.[index]?.label?.message
                            }
                        />
                    )}
                ></Controller>
                <Controller
                    name={`dropdownItems.${index}.value`}
                    control={control}
                    render={({ field }) => (
                        <Form.Input
                            data-testid="dropdown-item-value"
                            placeholder="Enter value"
                            {...field}
                            errorMessage={
                                errors.dropdownItems?.[index]?.value?.message
                            }
                        />
                    )}
                ></Controller>
                <DeleteButton
                    onClick={onDelete}
                    popoverMessage={renderPopoverMessage()}
                    disabled={isDeleteDisabled()}
                />
            </DropdownItemsChildWrapper>
        </Wrapper>
    );
};
