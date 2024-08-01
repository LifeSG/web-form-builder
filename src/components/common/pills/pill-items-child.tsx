import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Form } from "@lifesg/react-design-system/form";
import { Text } from "@lifesg/react-design-system/text";
import { DragHandleIcon, PlusCircleIcon } from "@lifesg/react-icons";
import { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ITextareaFieldAttributes } from "src/context-providers";
import { DeleteButton } from "../delete-button";
import {
    DroppableWrapper,
    PillDragHandleButton,
    PillFieldsWrapper,
    Wrapper,
} from "./pill-items-child.styles";

interface IProps {
    id: string;
    index: number;
    onDelete: () => void;
    disableDelete: boolean;
}

export const PillItemsChild = ({
    id,
    index,
    onDelete,
    disableDelete,
}: IProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<ITextareaFieldAttributes>();

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
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        opacity: isDragging ? "70%" : "100%",
        zIndex: isDragging ? 1 : "auto",
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
            <div ref={setNodeRef} style={style} {...attributes}>
                <PillFieldsWrapper>
                    <PillDragHandleButton {...listeners}>
                        <DragHandleIcon data-testid="drag-handle" />
                    </PillDragHandleButton>
                    <Controller
                        name={`pillItems.${index}.content`}
                        control={control}
                        render={({ field }) => (
                            <Form.Input
                                {...field}
                                placeholder="Enter short text"
                                errorMessage={
                                    errors?.pillItems?.[index]?.content?.message
                                }
                            />
                        )}
                    />
                    <DeleteButton
                        onClick={onDelete}
                        popoverMessage={renderPopoverMessage()}
                        disabled={disableDelete}
                    />
                </PillFieldsWrapper>
            </div>
        </Wrapper>
    );
};
