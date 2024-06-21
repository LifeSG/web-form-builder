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
        <Wrapper>
            {renderAlert()}
            <AccordionWrapper>
                <BasicDetails />
            </AccordionWrapper>
            <Validation />
            <ConditionalRendering />
            <Prefill />
        </Wrapper>
    );
};
