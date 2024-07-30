import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Form } from "@lifesg/react-design-system/form";
import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { BinIcon, DragHandleIcon, PlusCircleIcon } from "@lifesg/react-icons";
import { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ITextareaFieldAttributes } from "src/context-providers";
import {
    DeleteButton,
    DroppableWrapper,
    PillDragHandleButton,
    PillFieldsWrapper,
    Wrapper,
} from "./pill-items.styles";

interface IProps {
    item: any;
    index: number;
    onDelete: () => void;
    disableDelete: boolean;
}

export const PillItem = ({ item, index, onDelete, disableDelete }: IProps) => {
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
    } = useSortable({ id: item.id });

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

    return (
        <Wrapper>
            {droppableContent}
            <div ref={setNodeRef} style={style} {...attributes}>
                <PillFieldsWrapper>
                    <PillDragHandleButton {...listeners}>
                        <DragHandleIcon data-testid="drag-handle" />
                    </PillDragHandleButton>
                    <Controller
                        key={item.id}
                        name={`pillItems.${index}.content`}
                        control={control}
                        render={({ field }) => (
                            <Form.Input
                                placeholder="Enter short text"
                                value={field.value}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                errorMessage={
                                    errors?.pillItems?.[index]?.content?.message
                                }
                            />
                        )}
                    />
                    <DeleteButton
                        $disable={disableDelete}
                        data-testid={`delete-button-${index}`}
                        onClick={disableDelete ? () => {} : onDelete}
                    >
                        {disableDelete ? (
                            <PopoverTrigger
                                popoverContent={
                                    "Item deletion is not allowed when there are less than 3 items."
                                }
                                trigger="hover"
                                position="bottom"
                                data-testid={`delete-button-popover-${index}`}
                            >
                                <BinIcon />
                            </PopoverTrigger>
                        ) : (
                            <BinIcon />
                        )}
                    </DeleteButton>
                </PillFieldsWrapper>
            </div>
        </Wrapper>
    );
};
