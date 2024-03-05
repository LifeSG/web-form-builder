import { Main } from "./components";
import { SidePanel } from "./components/side-panel";
import { BuilderProvider } from "./context-providers/builder";

export const FormBuilder = () => {
    return (
        <BuilderProvider>
            <Main>
                <div style={{ border: "2px solid red", display: "flex" }}>
                    Main content here...
                </div>
                <SidePanel />
            </Main>
        </BuilderProvider>
    );
};
