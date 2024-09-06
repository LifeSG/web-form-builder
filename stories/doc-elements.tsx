import { FormBuilder } from "src";
import { TElement } from "src/context-providers";

interface IProps {
    onSubmit?: (formData: TElement) => Promise<unknown>;
}

export const DocElement = ({ onSubmit }: IProps) => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <FormBuilder onSubmit={onSubmit} />
        </div>
    );
};
