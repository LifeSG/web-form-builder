import { ColProps } from "@lifesg/react-design-system";
import { TElement } from "src/schemas";

export interface ICardProps extends ColProps {
    field: TElement;
    isFocused?: boolean;
    onHover?: () => void;
    onClick: () => void;
}

export interface ICardContentStyles {
    $isFocused: boolean;
}
