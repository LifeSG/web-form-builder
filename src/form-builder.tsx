import React, { useState, useEffect } from "react";
import { MainPanel, SidePanel } from "./components";
import { Toasts } from "./components/common";
import { DisplayProvider } from "./context-providers";
import { BuilderProvider } from "./context-providers/builder";
import {
    Container,
    ErrorWrapper,
    ToastWrapper,
    Wrapper,
} from "./form-builder.styles";
import { ErrorDisplay } from "@lifesg/react-design-system/error-display";

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
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1200);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderScreen = () => {
        if (isLargeScreen) {
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
        } else {
            return (
                <ErrorWrapper>
                    <ErrorDisplay
                        type="warning"
                        title={"Screen size not supported"}
                        description={
                            "Expand to a bigger screen size or switch to desktop view to use the form builder."
                        }
                    />
                </ErrorWrapper>
            );
        }
    };

    return renderScreen();
};
