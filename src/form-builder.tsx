import { ElementListPanel, Main, SidePanel } from "./components";
import { BuilderProvider } from "./context-providers/builder";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <Main>
                <ElementListPanel />
                <SidePanel />
            </Main>
        </BuilderProvider>
    );
};
