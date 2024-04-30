import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { IBaseTextBasedFieldValues, SchemaHelper } from "src/schemas";
import { EBuilderMode, useBuilder } from "../../context-providers";
import { ElementEditor } from "../element-editor";
import { AddElementsPanel } from "./add-elements-panel";
import { SidePanelHeader } from "./side-panel-header";
import { ContentSection, ContentWrapper, Wrapper } from "./side-panel.styles";
import { Toolbar } from "./toolbar";

export const SidePanel = () => {
    // =========================================================================
    // CONST, STATE, REFS
    // =========================================================================
    const {
        showSidePanel,
        currentMode,
        focusedElement,
        updateElement,
        updateFocusedElement,
    } = useBuilder();
    const methods = useForm({
        mode: "onBlur",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================
    const onSubmit = useCallback(
        (values) => {
            updateElement(values);
            updateFocusedElement(false, values);
        },
        [updateElement, updateFocusedElement]
    );
    // =========================================================================
    // USE EFFECTS
    // =========================================================================
    useEffect(() => {
        methods.reset(undefined, {
            keepValues: true,
            keepDirty: false,
        });
    }, [methods.formState.isSubmitSuccessful]);

    useEffect(() => {
        if (focusedElement) {
            Object.keys(focusedElement.element).forEach((key) => {
                methods.resetField(key as keyof IBaseTextBasedFieldValues, {
                    defaultValue:
                        focusedElement.element[key] !== undefined
                            ? (focusedElement.element[key] as string)
                            : "",
                });
            });
        }
    }, [focusedElement?.element, methods.resetField]);

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================

    const renderPanelContent = () => {
        if (focusedElement) {
            return <ElementEditor />;
        }

        switch (currentMode) {
            case EBuilderMode.ADD_ELEMENT:
                return <AddElementsPanel />;
            default:
                return (
                    <div data-testid="default-content">
                        Some content here...
                    </div>
                );
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Wrapper $minimised={focusedElement ? false : !showSidePanel}>
                    <SidePanelHeader />
                    <ContentWrapper>
                        <ContentSection
                            $isFocusedElement={focusedElement ? true : false}
                        >
                            {renderPanelContent()}
                        </ContentSection>
                        {focusedElement === null && <Toolbar />}
                    </ContentWrapper>
                </Wrapper>
            </form>
        </FormProvider>
    );
};
