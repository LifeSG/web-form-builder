import { FormBuilder } from "src";
import { TElement } from "src/context-providers";

interface IProps {
    onSubmit?: (formData: TElement) => Promise<unknown>;
}

export const DocElement = ({ onSubmit }: IProps) => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <FormBuilder
                onSubmit={onSubmit}
                config={{
                    elements: {
                        Dropdown: {
                            shouldShow: true, // Dropdown element would be hidden from the Add Elements panel
                            attributes: {
                                id: {
                                    shouldShow: true,
                                },
                            },
                        },
                        "Contact number": {
                            attributes: {
                                type: {
                                    shouldShow: false,
                                },
                            },
                        },
                    },
                    attributes: {
                        id: {
                            shouldShow: false,
                        },
                        type: {
                            shouldShow: false,
                        },
                    },
                }}
            />
        </div>
    );
};
