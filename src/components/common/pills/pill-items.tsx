import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { BinIcon, DragHandleIcon } from "@lifesg/react-icons";
import { CSSProperties } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ITextareaFieldAttributes } from "src/context-providers";
import {
    DeleteButton,
    PillDragHandleButton,
    PillFieldsWrapper,
    PrefillItemInput,
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

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: "flex",
        width: "100%",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <PillFieldsWrapper>
                <PillDragHandleButton>
                    <DragHandleIcon data-testid="drag-handle" />
                </PillDragHandleButton>
                <div>
                    <Controller
                        key={item.id}
                        name={`pillItems.${index}.content`}
                        control={control}
                        render={({ field }) => (
                            <PrefillItemInput
                                name={`pillItems.${index}.content`}
                                label=""
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
                        shouldUnregister
                    />
                </div>
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
    );
};
