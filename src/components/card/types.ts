import { ColProps } from "@lifesg/react-design-system";
import { TField } from "src/schemas";

export interface ICardProps extends ColProps {
    field: TField;
    isFocused: boolean;
    onHover?: () => void;
    onClick: () => void;
}

export interface ICardContentStyles {
    $isFocused: boolean;
}
