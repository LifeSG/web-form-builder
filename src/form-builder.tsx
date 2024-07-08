import { IFrontendEngineData } from "@lifesg/web-frontend-engine";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MainPanel, SidePanel } from "./components";
import { Modals, Toasts } from "./components/common";
import { ScreenNotSupportedErrorDisplay } from "./components/error-display/screen-not-supported-error";
import { DisplayProvider } from "./context-providers";
import {
    BuilderProvider,
    IPrefillAttributes,
    TElementMap,
    useBuilder,
} from "./context-providers/builder";
import { Container, Wrapper } from "./form-builder.styles";
import { Translator } from "./translator/translator";

interface IPrefillSchema {
    [key: string]: IPrefillAttributes | IPrefillAttributes[];
}
export interface ISchemaProps {
    schema: IFrontendEngineData;
    prefill: IPrefillSchema;
}

export interface IFormBuilderMethods {
    generateSchema: (elementsList?: TElementMap) => ISchemaProps;
    translateSchema: (schema: string) => void;
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
    const { elements, orderedIdentifiers } = useBuilder();

    useImperativeHandle(
        ref,
        () => ({
            generateSchema: () =>
                Translator.generateSchema(elements, orderedIdentifiers),
            translateSchema: (schema: string) =>
                Translator.translateSchema(schema),
        }),
        [elements, orderedIdentifiers]
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
    (props, ref) => {
        return (
            <BuilderProvider>
                <DisplayProvider>
                    <Component ref={ref} {...props} />
                </DisplayProvider>
            </BuilderProvider>
        );
    }
);
