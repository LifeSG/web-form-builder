import { MainPanel, SidePanel } from "./components";
import { Modals, Toasts } from "./components/common";
import { DisplayProvider } from "./context-providers";
import { BuilderProvider } from "./context-providers/builder";
import { Container, ToastWrapper, Wrapper } from "./form-builder.styles";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <DisplayProvider>
                <Wrapper>
                    <Container type="grid" stretch>
                        <Toasts />
                        <Modals />
                        <MainPanel />
                        <SidePanel />
                    </Container>
                </Wrapper>
            </DisplayProvider>
        </BuilderProvider>
    );
};
