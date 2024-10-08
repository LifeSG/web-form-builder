import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { MainPanel, SidePanel } from "./components";
import { Modals, Toasts } from "./components/common";
import { ScreenNotSupportedErrorDisplay } from "./components/error-display/screen-not-supported-error";
import { DisplayProvider } from "./context-providers";
import {
    BuilderProvider,
    TElement,
    TElementMap,
    useBuilder,
} from "./context-providers/builder";
import { Container, Wrapper } from "./form-builder.styles";
import { ISchemaProps, Translator } from "./translator";

export interface IFormBuilderMethods {
    generateSchema: (elementsList?: TElementMap) => ISchemaProps;
    parseSchema: (schema: ISchemaProps) => void;
}

interface IProps {
    offset?: number;
    onSubmit?: (formData: TElement) => Promise<unknown>;
}

const Component = forwardRef<IFormBuilderMethods, IProps>(
    ({ offset, onSubmit }, ref) => {
        // =========================================================================
        // CONST, STATE, REFS
        // =========================================================================
        const [isLargeScreen, setIsLargeScreen] = useState(
            window.innerWidth >= 1200
        );
        const {
            elements,
            updateElementSchema,
            orderedIdentifiers,
            isSubmitting,
            removeFocusedElement,
            focusedElement,
        } = useBuilder();

        useImperativeHandle(
            ref,
            () => ({
                generateSchema: () =>
                    Translator.generateSchema(elements, orderedIdentifiers),
                parseSchema: (schema: ISchemaProps) => {
                    const { newOrderedIdentifiers, newElements } =
                        Translator.parseSchema(schema) || {};

                    // If there are no elements in schema, clear the form and remove focused element
                    if (!newOrderedIdentifiers || !newElements) {
                        updateElementSchema({}, []);
                        removeFocusedElement();
                        return;
                    }

                    const newFocusedElement = Object.values(newElements).find(
                        (element) => element.id === focusedElement?.element?.id
                    );
                    updateElementSchema(
                        newElements,
                        newOrderedIdentifiers,
                        newFocusedElement
                    );
                },
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
            <Wrapper $disabled={isSubmitting}>
                {!isLargeScreen && <ScreenNotSupportedErrorDisplay />}
                <Container
                    type="grid"
                    stretch
                    $isLargeScreen={isLargeScreen}
                    {...{ inert: isSubmitting ? "" : undefined }}
                >
                    <Toasts />
                    <Modals />
                    <MainPanel />
                    <SidePanel offset={offset} onSubmit={onSubmit} />
                </Container>
            </Wrapper>
        );
    }
);

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
