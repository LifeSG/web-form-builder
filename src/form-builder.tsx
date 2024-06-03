import { MainPanel, SidePanel } from "./components";
import { Toasts } from "./components/common";
import { DisplayProvider } from "./context-providers";
import { BuilderProvider } from "./context-providers/builder";
import { Container, ToastWrapper, Wrapper } from "./form-builder.styles";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <DisplayProvider>
                <Wrapper>
                    <Container type="grid" stretch>
                        <ToastWrapper>
                            <Toasts />
                        </ToastWrapper>
                        <MainPanel />
                        <SidePanel />
                    </Container>
                </Wrapper>
            </DisplayProvider>
        </BuilderProvider>
    );
};
