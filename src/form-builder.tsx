import { MainPanel, SidePanel } from "./components";
import { BuilderProvider } from "./context-providers/builder";
import { Container, Wrapper } from "./form-builder.styles";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <Wrapper>
                <Container type="grid" stretch>
                    <MainPanel />
                    <SidePanel />
                </Container>
            </Wrapper>
        </BuilderProvider>
    );
};
