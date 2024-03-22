import { Body } from "./base-card.styles";

interface IProps {
    id?: string;
    children: React.ReactNode;
    focused?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const BaseCard = ({ id, children, focused, onClick }: IProps) => {
    return (
        <Body tabIndex={0} $focused={focused} onClick={onClick} id={id}>
            {children}
        </Body>
    );
};
