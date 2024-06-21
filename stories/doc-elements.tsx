import { useRef } from "react";
import { FormBuilder, IFormBuilderMethods } from "src";

export const DocElement = () => {
    const formBuilderRef = useRef<IFormBuilderMethods>(null);

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <FormBuilder ref={formBuilderRef} />
        </div>
    );
};
