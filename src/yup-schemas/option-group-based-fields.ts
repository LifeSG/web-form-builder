import * as yup from "yup";

export const OPTION_GROUP_BASED_SCHEMA = yup.object().shape({
    placeholder: yup.string().optional(),
    dropdownItems: yup
        .array()
        .of(
            yup.object().shape({
                label: yup.string().optional(),
                value: yup.string().optional(),
            })
        )
        .test(
            "min-2-valid-items",
            "At least 2 items with valid label and value are required.",
            function (dropdownItems) {
                const validItemsCount = dropdownItems.filter(
                    (item) => item.label && item.value
                ).length;

                const allItemsValidOrEmpty = dropdownItems.every(
                    (item) =>
                        (item.label && item.value) ||
                        (!item.label && !item.value)
                );

                if (validItemsCount >= 2 && allItemsValidOrEmpty) {
                    return true;
                }

                const errors = dropdownItems.reduce((acc, item, index) => {
                    if (!item.label && !item.value && validItemsCount >= 2) {
                        return acc;
                    }
                    if (!item.label) {
                        acc.push(
                            this.createError({
                                path: `${this.path}[${index}].label`,
                                message: "Option label required.",
                            })
                        );
                    }
                    if (!item.value) {
                        acc.push(
                            this.createError({
                                path: `${this.path}[${index}].value`,
                                message: "Option value required.",
                            })
                        );
                    }
                    return acc;
                }, []);

                throw new yup.ValidationError(errors);
            }
        ),
    preselectedValue: yup.string().optional(),
});
