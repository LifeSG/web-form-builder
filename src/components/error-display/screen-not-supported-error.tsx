import { ErrorDisplay } from "@lifesg/react-design-system/error-display";
import { ErrorWrapper } from "./screen-not-supported-error.styles";

export const ScreenNotSupportedErrorDisplay = () => {
    return (
        <ErrorWrapper>
            <ErrorDisplay
                type="warning"
                title={"Screen size not supported"}
                description={
                    "Expand to a bigger screen size or switch to desktop view to use the form builder."
                }
            />
        </ErrorWrapper>
    );
};
