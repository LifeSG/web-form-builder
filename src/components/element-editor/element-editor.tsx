import { useBuilder } from "src/context-providers";
import { BasicDetails } from "./basic-details";
import { AccordionWrapper, SaveChangesAlert } from "./element-editor.styles";

export const ElementEditor = () => {
    // =========================================================================
    // CONST, STATE, REF
    // =========================================================================
    const { focusedElement } = useBuilder();

    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================

    const renderAlert = () => {
        if (focusedElement.isDirty === false) {
            return <></>;
        }
        return (
            <SaveChangesAlert type="warning" showIcon>
                To reflect changes on preview, save changes first.
            </SaveChangesAlert>
        );
    };

    return (
        <>
            {renderAlert()}
            <AccordionWrapper>
                <BasicDetails />
            </AccordionWrapper>
        </>
    );
};
