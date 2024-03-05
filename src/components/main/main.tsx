import { Container, Wrapper } from "./main.styles";

interface IProps {
    children: React.ReactNode;
}

export const Main = ({ children }: IProps) => {
    return (
        <Wrapper>
            <Container type="grid" stretch>
                {children}
            </Container>
        </Wrapper>
    );
};
