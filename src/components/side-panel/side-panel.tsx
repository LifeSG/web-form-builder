import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { EElementType } from "src/context-providers";
import { SchemaHelper } from "src/schemas";
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
    const { showSidePanel, currentMode, focusedElement } = useBuilder();
    const methods = useForm({
        mode: "onBlur",
        // TODO: insert proper type; email is a placeholder
        resolver: yupResolver(SchemaHelper.buildSchema(EElementType.EMAIL)),
    });

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
                return <>Some content here...</>;
        }
    };

    return (
        <FormProvider {...methods}>
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
        </FormProvider>
    );
};
