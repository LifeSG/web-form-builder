import { useEffect, useState } from "react";
import { MainPanel, SidePanel } from "./components";
import { Toasts } from "./components/common";
import { DisplayProvider } from "./context-providers";
import { BuilderProvider } from "./context-providers/builder";
import { Container, ToastWrapper, Wrapper } from "./form-builder.styles";
import { ScreenNotSupportedErrorDisplay } from "./components/error-display/screen-not-supported-error";

export const FormBuilder = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 1200
    );

    // =========================================================================
    // EFFECTS
    // =========================================================================
    useEffect(() => {
        if (window) {
            const handleResize = () => {
                setIsLargeScreen(window.innerWidth >= 1200);
            };
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    return isLargeScreen ? (
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
    ) : (
        <ScreenNotSupportedErrorDisplay />
    );
};
