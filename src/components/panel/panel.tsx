import { SidePanel } from "./side-panel";
import {
    SidePanelBody,
    SidePanelContent,
} from "./side-panel/side-panel.styles";

export const Panel = () => {
    return (
        <SidePanel>
            <SidePanelBody>
                <SidePanelContent>
                    <h2>Hello World!</h2>
                </SidePanelContent>
            </SidePanelBody>
        </SidePanel>
    );
};
