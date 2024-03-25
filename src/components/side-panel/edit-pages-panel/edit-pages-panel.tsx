import { PageButtonCard } from "src/components/page-button-card";
import { useBuilder } from "src/context-providers";
import { List } from "./edit-pages-panel.styles";

export const EditPagesPanel = () => {
    const { pages } = useBuilder();
    // =============================================================================
    // RENDER FUNCTIONS
    // =============================================================================
    return (
        <>
            <List>
                {Object.values(pages).map((page) => (
                    <PageButtonCard page={page} />
                ))}
            </List>
        </>
    );
};
