import { Body } from "./base-card.styles";

export interface IProps {
    id?: string;
    children: React.ReactNode;
    focused?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
}

export const BaseCard = ({
    id,
    children,
    focused,
    onClick,
    className = "pointer",
}: IProps) => {
    return (
        <Body
            tabIndex={0}
            $focused={focused}
            onClick={onClick}
            id={id}
            role="button"
            className={className}
        >
            {children}
        </Body>
    );
};
