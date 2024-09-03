import { useFormBuilderConfigContext } from "./form-builder-config";

export const useShouldShowPrefill = () => {
    const { sections } = useFormBuilderConfigContext();

    const shouldShow = sections?.prefill?.shouldShow ?? true;

    return shouldShow;
};
