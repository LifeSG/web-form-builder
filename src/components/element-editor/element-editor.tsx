import { useBuilder } from "src/context-providers";
import { BasicDetails } from "./basic-details";
import { ConditionalRendering } from "./conditional-rendering";
import {
    AccordionWrapper,
    SaveChangesAlert,
    Wrapper,
} from "./element-editor.styles";
import { Prefill } from "./prefill";
import { Validation } from "./validation/validation";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { focusedElement } = useBuilder();

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    const hasProperty = (key: string) => {
        return key in focusedElement.element;
    };

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderAlert = () => {
        if (!focusedElement.isDirty) {
            return <></>;
        } else {
            return (
                <SaveChangesAlert type="warning" showIcon>
                    To reflect changes on preview, save changes first.
                </SaveChangesAlert>
            );
        }
    };

    return (
        <Wrapper data-testid="element-editor">
            {renderAlert()}
            <AccordionWrapper>
                <BasicDetails />
            </AccordionWrapper>
            {hasProperty("validation") && <Validation />}
            <ConditionalRendering />
            <Prefill />
        </Wrapper>
    );
};
