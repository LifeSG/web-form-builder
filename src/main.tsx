import { BasePanel } from "./components/panel/side-panel";
import {
    BasePanelBody,
    BasePanelContent,
} from "./components/panel/side-panel.styles";
import { BuilderProvider } from "./context-providers/builder";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <BasePanel>
                <BasePanelBody>
                    <BasePanelContent>
                        <h2>Hello World!</h2>
                    </BasePanelContent>
                </BasePanelBody>
            </BasePanel>
        </BuilderProvider>
    );
};
