import { BinIcon, DragHandleIcon } from "@lifesg/react-icons";
import {
    DeleteButton,
    PillFieldsWrapper,
    PrefillItemInput,
} from "./pill-items.styles";
import {
    IPillItemAttributes,
    ITextareaFieldAttributes,
} from "src/context-providers";
import { CSS } from "@dnd-kit/utilities";
import {
    Controller,
    ControllerRenderProps,
    FieldErrors,
    useFormContext,
} from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { PopoverTrigger } from "@lifesg/react-design-system/popover-v2";
import { Button } from "@lifesg/react-design-system/button";

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
                <DragHandleIcon data-testid="drag-handle" />
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
            </PillFieldsWrapper>
            <DeleteButton
                $disable={disableDelete}
                data-testid="delete-button"
                onClick={disableDelete ? () => {} : onDelete}
            >
                {disableDelete ? (
                    <PopoverTrigger
                        popoverContent={
                            "Item deletion is not allowed when there are less than 3 items."
                        }
                        trigger="hover"
                        position="bottom"
                    >
                        <BinIcon />
                    </PopoverTrigger>
                ) : (
                    <BinIcon />
                )}
            </DeleteButton>
        </div>
    );
};
