import { TField } from "src/schemas";

export interface ICardProps {
    field: TField;
    isFocused: boolean;
    onHover: () => void;
    onClick: () => void;
}

export interface ICardContentStyles {
    $isFocused: boolean;
}
