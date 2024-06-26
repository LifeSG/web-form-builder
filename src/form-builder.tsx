import { IFrontendEngineData } from "@lifesg/web-frontend-engine/components/types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MainPanel, SidePanel } from "./components";
import { Modals, Toasts } from "./components/common";
import { ScreenNotSupportedErrorDisplay } from "./components/error-display/screen-not-supported-error";
import { DisplayProvider } from "./context-providers";
import {
    BuilderProvider,
    TElementMap,
    useBuilder,
} from "./context-providers/builder";
import { Container, Wrapper } from "./form-builder.styles";
import { Translator } from "./util/translator/translator";

export interface IFormBuilderMethods {
    generate?: (elementsList?: TElementMap) => IFrontendEngineData;
    translate?: (text: string) => void;
}

interface IProps {
    offset?: number;
}

const Component = forwardRef<IFormBuilderMethods, IProps>(({ offset }, ref) => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 1200
    );
    const { elements } = useBuilder();

    useImperativeHandle(
        ref,
        () => ({
            generate: () => Translator.generateSchema(elements),
            translate: (text: string) => Translator.translateSchema(text),
        }),
        [elements]
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

    return (
        <Wrapper>
            {!isLargeScreen && <ScreenNotSupportedErrorDisplay />}
            <Container type="grid" stretch $isLargeScreen={isLargeScreen}>
                <Toasts />
                <Modals />
                <MainPanel />
                <SidePanel offset={offset} />
            </Container>
        </Wrapper>
    );
});

export const FormBuilder = forwardRef<IFormBuilderMethods, IProps>(
    ({ offset }, ref) => {
        return (
            <BuilderProvider>
                <DisplayProvider>
                    <Component ref={ref} offset={offset} />
                </DisplayProvider>
            </BuilderProvider>
        );
    }
);
