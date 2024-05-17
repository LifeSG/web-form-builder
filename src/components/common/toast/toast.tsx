import { Toast } from "@lifesg/react-design-system/toast";
import { EToastTypes, IToast } from "src/context-providers";
import { FunctionText } from "./toast.styles";

interface IProps {
    toast?: IToast;
    toastFunction?: () => void;
}

export const DisplayToast = ({ toast, toastFunction }: IProps) => {
    const renderToast = () => {
        switch (toast.type) {
            case EToastTypes.SUCCESS_TOAST: {
                return (
                    <Toast type={"success"} label={toast.message} autoDismiss />
                );
            }

            case EToastTypes.DELETE_TOAST: {
                return (
                    <>
                        <Toast
                            type={"success"}
                            label={toast.message}
                            autoDismiss
                        />
                        {/* <FunctionText onClick={toastFunction} weight={600}>
                            Undo
                        </FunctionText> */}
                    </>
                );
            }
        }
    };

    return renderToast();
};
