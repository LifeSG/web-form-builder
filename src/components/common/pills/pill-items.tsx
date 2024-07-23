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
import { ControllerRenderProps, FieldErrors } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";

interface IProps {
    item: {
        id: string;
        content: string;
    };
    field: ControllerRenderProps<
        ITextareaFieldAttributes,
        `pillItems.${number}.content`
    >;
    index: number;
    errors: FieldErrors<ITextareaFieldAttributes>;
    onDelete: () => void;
    disableDelete: boolean;
}

export const PillItem = ({
    item,
    field,
    index,
    errors,
    onDelete,
    disableDelete,
}: IProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });
    const style: CSSProperties = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
        display: "flex",
        width: "100%",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <PillFieldsWrapper>
                <DragHandleIcon data-testid="drag-handle" />
                <div>
                    <PrefillItemInput
                        name={`pillItems.${index}`}
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
                </div>
            </PillFieldsWrapper>
            <DeleteButton
                $disable={disableDelete}
                data-testid="delete-button"
                onClick={onDelete}
            >
                <BinIcon />
            </DeleteButton>
        </div>
    );
};
