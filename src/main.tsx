import { Panel } from "./components/panel";
import { BuilderProvider } from "./context-providers/builder";
import { MainWrapper } from "./context-providers/builder/provider.styles";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <MainWrapper>
                <Panel></Panel>
            </MainWrapper>
        </BuilderProvider>
    );
};
