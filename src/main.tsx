import { BasePanel } from "./components/panel/base-panel";
import { TemplatePage } from "./components/template-page";
import { BuilderProvider } from "./context-providers/builder";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <TemplatePage>
                <BasePanel>
                <h1>Hello World!</h1>
                </BasePanel>
            </TemplatePage>
        </BuilderProvider>
    );
};
