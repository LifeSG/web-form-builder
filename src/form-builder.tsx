import { MainPanel, SidePanel } from "./components";
import { DisplayProvider } from "./context-providers";
import { BuilderProvider } from "./context-providers/builder";
import { Container, Wrapper } from "./form-builder.styles";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <DisplayProvider>
                <Wrapper>
                    <Container type="grid" stretch>
                        <MainPanel />
                        <SidePanel />
                    </Container>
                </Wrapper>
            </DisplayProvider>
        </BuilderProvider>
    );
};
