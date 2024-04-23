import { Form } from "@lifesg/react-design-system";
import { ChildEntry } from "src/components/common";
import { FieldWrapper } from "./validation.styles";

interface IProps {
    onDelete: () => void;
    options: string[];
}

export const ValidationChild = ({ onDelete, options }: IProps) => {
    return (
        <ChildEntry onDelete={onDelete}>
            <FieldWrapper>
                <div>
                    <Form.Select
                        placeholder="Select"
                        selectedOption={
                            options.length === 1 ? options[0] : "Select"
                        }
                        options={options}
                        disabled={options.length === 1}
                    />
                </div>
                <div>
                    <Form.Textarea placeholder="Enter rule" />
                </div>
                <div>
                    <Form.Input placeholder="Set error message" />
                </div>
            </FieldWrapper>
        </ChildEntry>
    );
};
