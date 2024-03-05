import { Wrapper } from "./main.styles";

interface IProps {
    children: React.ReactNode;
}

export const Main = ({ children }: IProps) => {
    return (
        <Wrapper>{children}</Wrapper>
    ); 
};