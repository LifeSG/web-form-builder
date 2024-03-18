import { Body } from "./base-card.styles";

interface IProps {
    children: React.ReactNode;
    focused?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const BaseCard = ({ children, focused, onClick }: IProps) => {
    return (
        <Body tabIndex={0} $focused={focused} onClick={onClick}>
            {children}
        </Body>
    );
};
