import { useContext } from "react";
import { FormBuilderContext } from "./form-builder-provider";

export const useFormBuilder = () => {
    const { state, dispatch } = useContext(FormBuilderContext);

    return {
        state,
        dispatch,
    };
};
